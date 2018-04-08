import config from '../../config';

// DOMUSTO
import DomustoPlugin from '../../domusto/DomustoPlugin';

// INTERFACES
import { Domusto } from '../../domusto/DomustoTypes';
import DomustoZwaveApi from './api';
import ZWaveCommandClasses from './zwave-command-classes';

// PLUGIN SPECIFIC
import * as ZWave from 'openzwave-shared';
import DomustoSocketIO from '../../domusto/DomustoSocketIO';

// http://wiki.micasaverde.com/index.php/ZWave_Command_Classes
// [ZWAVE] node%d: %s, %s 8 Unknown: id=0258 Unknown: type=0003, id=1082
// [ZWAVE] node%d: name="%s", type="%s", location="%s" 8  Access Control Sensor
// [ZWAVE] node%d: class %d 8 32 // basic
// [ZWAVE] node%d: class %d 8 48 // sensor binary
// [ZWAVE] node%d: class %d 8 94 //zwave plus info
// [ZWAVE] node%d: class %d 8 113 // alarm
// [ZWAVE] node%d: class %d 8 115 // power level
// [ZWAVE] node%d: class %d 8 128 // battery
// [ZWAVE] node%d: class %d 8 132 // wake up
// [ZWAVE] node%d: class %d 8 134 // version

/**
 * Z-wave plugin for DOMUSTO
 * @author Bas van Dijk
 * @version 0.0.1
 *
 * @class DomustoZWave
 * @extends {DomustoPlugin}
 */
class DomustoZWave extends DomustoPlugin {

    private attachedInputDeviceIds = [];
    private nodes = {};
    private zwave;
    private inclusionMode = false;
    private exclusionMode = false;

    /**
     * Creates an instance of Domustothis.zwave.
     * @param {any} Plugin configuration as defined in the config.js file
     * @memberof DomustoZWave
     */
    constructor(pluginConfiguration: Domusto.PluginConfiguration) {

        super({
            plugin: 'Z-wave transceiver',
            author: 'Bas van Dijk',
            category: Domusto.PluginCategories.radio,
            version: '0.0.1',
            website: 'http://domusto.com'
        });

        this.pluginConfiguration = pluginConfiguration;

        // DomustoZWaveApi.setPluginInstance(this);
        this.zwave = new ZWave({
            Logging: false,     // disable file logging (OZWLog.txt)
            ConsoleOutput: pluginConfiguration.settings.port // enable console logging
        });

        // initialising OpenZWave addon (/home/pi/domusto-server/node_modules/openzwave-shared/lib/../build/Release/openzwave_shared.node)
        // Initialising OpenZWave 1.4.79 binary addon for Node.JS.
        // OpenZWave Security API is ENABLED
        // ZWave device db    : /usr/etc/openzwave
        // User settings path : /home/pi/domusto-server/node_modules/openzwave-shared/build/Release/../../

        DomustoZwaveApi.setPluginInstance(this);
        this.console.header(`${pluginConfiguration.id} plugin ready`);

        this.hardwareInstance = this.zwave;

        this.zwave.connect(this.pluginConfiguration.settings.port);

        this.zwave.removeAssociation(10, 4, 1);
        this.zwave.removeAssociation(10, 1, 1);
        // this.zwave.addAssociation(10, 1, 1);

        if (this.pluginConfiguration.settings.pairingMode) {
            // this.enableAddNode();
        }

        console.log('groups', this.zwave.getNumGroups(10));

        this.init();

    }


    init() {

        try {

            this.zwave.on('node event', (nodeid, nodeEvt) => {
                this.console.log('>> node event');
                this.console.log(nodeid, nodeEvt);
            });

            this.zwave.on('node naming', (nodeid, nodeInfo) => {
                this.console.log('>> node naming');
                this.console.log(nodeid, nodeInfo);
            });

            this.zwave.on('driver ready', (homeid) => {
                this.console.log('>> driver ready');
                this.console.log(`scanning homeid=0x${homeid.toString(16)}...`);
            });

            this.zwave.on('driver failed', () => {
                this.console.log('>> driver failed');
                this.console.log('failed to start driver');
                this.zwave.disconnect();
                process.exit();
            });

            this.zwave.on('node removed', nodeid => {
                this.console.log('>> node removed');
                this.console.log('node removed', nodeid);
            });

            this.zwave.on('node added', (nodeid) => {

                this.console.log('>> node added');

                this.console.log('NODE ADDED NODEID:', nodeid);

                this.nodes['node-' + nodeid] = {
                    manufacturer: '',
                    manufacturerid: '',
                    product: '',
                    producttype: '',
                    productid: '',
                    type: '',
                    name: '',
                    loc: '',
                    classes: {},
                    ready: false,
                };
            });

            this.zwave.on('value added', (nodeId, comclass, valueId) => {

                this.console.log(`>> value added node ${nodeId} ${comclass} ${valueId}`);

                if (!this.nodes['node-' + nodeId]['classes'][comclass]) {
                    this.nodes['node-' + nodeId]['classes'][comclass] = {};
                }
                this.nodes['node-' + nodeId]['classes'][comclass][valueId.index] = valueId;

                DomustoSocketIO.emit('pluginZWave', { type: 'newDevice', deviceId: nodeId, device: this.nodes['node-' + nodeId]});


                // if (ZWaveCommandClasses.getClassByDecId(comclass).name === 'COMMAND_CLASS_SENSOR_BINARY') {

                //     console.log(value.value_id);

                //     // Broadcast a signal as if it was send from the client
                //     this.broadcastSignal(value.value_id, {
                //         state: value.value ? 'on' : 'off'
                //     }, Domusto.SignalSender.client);

                //     this.broadcastSignal(value.value_id, {
                //         state: value.value ? 'on' : 'off'
                //     }, Domusto.SignalSender.plugin);

                // }
            });

            this.zwave.on('value changed', (nodeId, comclass, value) => {

                this.console.log(`>> node${nodeId} value changed`);

                let commClassString = ZWaveCommandClasses.getClassByDecId(comclass).name;

                this.logToFile(`Node ${nodeId} - (${comclass}) ${commClassString} ${value.label} - value: ${value['value']} - ${JSON.stringify(value)}`);

                if (this.nodes['node-' + nodeId]['ready']) {
                    this.console.log(`   node${nodeId}: changed: ${comclass}:${value['label']}:${this.nodes['node-' + nodeId]['classes'][comclass][value.index]['value']}->${value['value']}`);
                }
                this.nodes['node-' + nodeId]['classes'][comclass][value.index] = value;

                console.log(commClassString);

                // Binary Sensor Command Class COMMAND_CLASS_SENSOR_BINARY
                if (commClassString === 'COMMAND_CLASS_SENSOR_BINARY') {

                    console.log(value.value_id);

                    // Broadcast a signal as if it was send from the client
                    this.broadcastSignal(value.value_id, {
                        state: value.value ? 'on' : 'off'
                    });

                }

                if (commClassString === 'COMMAND_CLASS_BATTERY') {
                    this.broadcastSignal(value.value_id, {
                        battery: value.value
                    });
                }

            });

            this.zwave.on('value removed', (nodeid, comclass, index) => {

                this.console.log('>> value removed');

                if (this.nodes['node-' + nodeid]['classes'][comclass] &&
                    this.nodes['node-' + nodeid]['classes'][comclass][index])
                    delete this.nodes['node-' + nodeid]['classes'][comclass][index];
            });

            this.zwave.on('node ready', (nodeid, nodeinfo) => {

                this.console.log('>> node ready');

                this.nodes['node-' + nodeid]['manufacturer'] = nodeinfo.manufacturer;
                this.nodes['node-' + nodeid]['manufacturerid'] = nodeinfo.manufacturerid;
                this.nodes['node-' + nodeid]['product'] = nodeinfo.product;
                this.nodes['node-' + nodeid]['producttype'] = nodeinfo.producttype;
                this.nodes['node-' + nodeid]['productid'] = nodeinfo.productid;
                this.nodes['node-' + nodeid]['type'] = nodeinfo.type;
                this.nodes['node-' + nodeid]['name'] = nodeinfo.name;
                this.nodes['node-' + nodeid]['loc'] = nodeinfo.loc;
                this.nodes['node-' + nodeid]['ready'] = true;
                this.console.log('node%d: %s, %s', nodeid,
                    nodeinfo.manufacturer ? nodeinfo.manufacturer
                        : 'id=' + nodeinfo.manufacturerid,
                    nodeinfo.product ? nodeinfo.product
                        : 'product=' + nodeinfo.productid +
                        ', type=' + nodeinfo.producttype);
                this.console.log(`node${nodeid}: name="${nodeinfo.name}", type="${nodeinfo.type}", location="${nodeinfo.loc}"`);
                for (let comclass in this.nodes['node-' + nodeid]['classes']) {
                    this.console.log('node', nodeid, 'class', comclass);
                    switch (comclass) {
                        case '0x25': // COMMAND_CLASS_SWITCH_BINARY
                        case '0x26': // COMMAND_CLASS_SWITCH_MULTILEVEL
                            let valueIds = this.nodes['node-' + nodeid]['classes'][comclass];
                            for (let valueId in valueIds) {
                                this.zwave.enablePoll(valueId);
                                break;
                            }
                        // this.console.log('node%d:   %s=%s', nodeid, values[idx]['label'], values[idx]['value']);
                    }
                }
            });

            this.zwave.on('notification', (nodeid, notif) => {
                switch (notif) {
                    case 0:
                        this.console.log('node: message complete', nodeid);
                        break;
                    case 1:
                        this.console.log('node: timeout', nodeid);
                        break;
                    case 2:
                        this.console.log('node: nop', nodeid);
                        break;
                    case 3:
                        this.console.log('node: node awake', nodeid);
                        break;
                    case 4:
                        this.console.log('node: node sleep', nodeid);
                        break;
                    case 5:
                        this.console.log('node: node dead', nodeid);
                        break;
                    case 6:
                        this.console.log('node: node alive', nodeid);
                        break;
                }
            });

            this.zwave.on('scan complete', () => {

                this.console.log('Scan complete');
                // set dimmer node 5 to 50%
                // this.zwave.setValue(5,38,1,0,50);
                // this.zwave.setValue( {node_id:5, class_id: 38, instance:1, index:0}, 50);

                // if (this.pluginConfiguration.settings.pairingMode) {
                //     this.console.log('Paring mode active');
                //     this._enablePairingMode();
                // }

            });

            this.zwave.on('controller command', (r, s) => {
                this.console.log('controller commmand feedback: r=%d, s=%d', r, s);
            });




        } catch (error) {
            this.console.log('Initialisation of RfxCom plugin failed', error);
        }

    }


    onSignalReceivedForPlugin(signal: Domusto.Signal) { }

    enableAddNode() {

        this.console.log('Adding node mode enabled');

        // Add a new device to the ZWave controller
        if (this.zwave.hasOwnProperty('beginControllerCommand')) {
            // using legacy mode (OpenZWave version < 1.3) - no security
            this.zwave.beginControllerCommand('AddDevice', true);
        } else {
            // using new security API
            // set this to 'true' for secure devices eg. door locks
            console.log('add');
            this.zwave.addNode(true);

            this.inclusionMode = true;
            this.exclusionMode = false;
        }
    }

    enableRemoveNode() {
        // Add a new device to the ZWave controller
        if (this.zwave.hasOwnProperty('beginControllerCommand')) {
            // using legacy mode (OpenZWave version < 1.3) - no security
            this.zwave.beginControllerCommand('RemoveDevice');
        } else {
            // using new security API
            // set this to 'true' for secure devices eg. door locks
            console.log('remove');
            this.zwave.removeNode(true);

            this.inclusionMode = false;
            this.exclusionMode = true;
        }
    }

    cancelControllerCommand() {

        this.zwave.cancelControllerCommand();

        this.inclusionMode = false;
        this.exclusionMode = false;
    }

}

export default DomustoZWave;