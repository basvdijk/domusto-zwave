import DomustoPluginApi from '../../domusto/DomustoPluginApi';

class DomustoZWaveApi extends DomustoPluginApi {

    constructor() {

        // Create api endpoint /plugin/domusto-zwave
        super('domusto-zwave');

        // Test route
        // this.addApiRouteGet(':deviceId', (request, response) => {
        //     response.json(true);
        // });

        // executes command specified
        this.addApiRouteGet('nodes/inclusion-mode', (request, response) => {

            this.pluginInstance.enableAddNode();

            response.json({
                command: 'Node add mode enabled',
                success: true,
                output: true
            });

        });

        // executes command specified
        this.addApiRouteGet('nodes/exclusion-mode', (request, response) => {

            this.pluginInstance.enableRemoveNode();

            response.json({
                command: 'Node remove mode enabled',
                success: true,
                output: true
            });

        });

        // executes command specified
        this.addApiRouteGet('nodes/remove-failed/:nodeId', (request, response) => {

            let node = this.pluginInstance.nodes['node-' + request.params.nodeId];

            if (node) {

                response.json({
                    output: request.params
                });

            } else {
                response.status(500).json({ error: `a node with nodeId ${request.params.nodeId} could not be found` });
            }

        });

        // executes command specified
        this.addApiRouteGet('nodes', (request, response) => {

            response.json({
                output: this.pluginInstance.nodes
            });

        });



    }


}

let DomustoZWaveApiInstance = new DomustoZWaveApi();
export default DomustoZWaveApiInstance;