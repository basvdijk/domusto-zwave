class ZWaveCommandClasses {

    getClassByDecId(classId: number) {
        let result = this.commandClasses.filter(commandClass => commandClass.dec === classId);

        if (result.length > 0) {
            return result[0];
        } else {
            return null;
        }
    }

    private commandClasses = [
        {
            name: 'COMMAND_CLASS_NO_OPERATION',
            dec: 0,
            hex: '0x00'
        },
        {
            name: 'COMMAND_CLASS_BASIC',
            dec: 32,
            hex: '0x20'
        },
        {
            name: 'COMMAND_CLASS_CONTROLLER_REPLICATION',
            dec: 33,
            hex: '0x21'
        },
        {
            name: 'COMMAND_CLASS_APPLICATION_STATUS',
            dec: 34,
            hex: '0x22'
        },
        {
            name: 'COMMAND_CLASS_ZIP_SERVICES',
            dec: 35,
            hex: '0x23'
        },
        {
            name: 'COMMAND_CLASS_ZIP_SERVER',
            dec: 36,
            hex: '0x24'
        },
        {
            name: 'COMMAND_CLASS_SWITCH_BINARY',
            dec: 37,
            hex: '0x25'
        },
        {
            name: 'COMMAND_CLASS_SWITCH_MULTILEVEL',
            dec: 38,
            hex: '0x26'
        },
        {
            name: 'COMMAND_CLASS_SWITCH_MULTILEVEL_V2',
            dec: 38,
            hex: '0x26'
        },
        {
            name: 'COMMAND_CLASS_SWITCH_ALL',
            dec: 39,
            hex: '0x27'
        },
        {
            name: 'COMMAND_CLASS_SWITCH_TOGGLE_BINARY',
            dec: 40,
            hex: '0x28'
        },
        {
            name: 'COMMAND_CLASS_SWITCH_TOGGLE_MULTILEVEL',
            dec: 41,
            hex: '0x29'
        },
        {
            name: 'COMMAND_CLASS_CHIMNEY_FAN',
            dec: 42,
            hex: '0x2A'
        },
        {
            name: 'COMMAND_CLASS_SCENE_ACTIVATION',
            dec: 43,
            hex: '0x2B'
        },
        {
            name: 'COMMAND_CLASS_SCENE_ACTUATOR_CONF',
            dec: 44,
            hex: '0x2C'
        },
        {
            name: 'COMMAND_CLASS_SCENE_CONTROLLER_CONF',
            dec: 45,
            hex: '0x2D'
        },
        {
            name: 'COMMAND_CLASS_ZIP_CLIENT',
            dec: 46,
            hex: '0x2E'
        },
        {
            name: 'COMMAND_CLASS_ZIP_ADV_SERVICES',
            dec: 47,
            hex: '0x2F'
        },
        {
            name: 'COMMAND_CLASS_SENSOR_BINARY',
            dec: 48,
            hex: '0x30'
        },
        {
            name: 'COMMAND_CLASS_SENSOR_MULTILEVEL',
            dec: 49,
            hex: '0x31'
        },
        {
            name: 'COMMAND_CLASS_SENSOR_MULTILEVEL_V2',
            dec: 49,
            hex: '0x31'
        },
        {
            name: 'COMMAND_CLASS_METER',
            dec: 50,
            hex: '0x32'
        },
        {
            name: 'COMMAND_CLASS_ZIP_ADV_SERVER',
            dec: 51,
            hex: '0x33'
        },
        {
            name: 'COMMAND_CLASS_ZIP_ADV_CLIENT',
            dec: 52,
            hex: '0x34'
        },
        {
            name: 'COMMAND_CLASS_METER_PULSE',
            dec: 53,
            hex: '0x35'
        },
        {
            name: 'COMMAND_CLASS_METER_TBL_CONFIG',
            dec: 60,
            hex: '0x3C'
        },
        {
            name: 'COMMAND_CLASS_METER_TBL_MONITOR',
            dec: 61,
            hex: '0x3D'
        },
        {
            name: 'COMMAND_CLASS_METER_TBL_PUSH',
            dec: 62,
            hex: '0x3E'
        },
        {
            name: 'COMMAND_CLASS_THERMOSTAT_HEATING',
            dec: 56,
            hex: '0x38'
        },
        {
            name: 'COMMAND_CLASS_THERMOSTAT_MODE',
            dec: 64,
            hex: '0x40'
        },
        {
            name: 'COMMAND_CLASS_THERMOSTAT_OPERATING_STATE',
            dec: 66,
            hex: '0x42'
        },
        {
            name: 'COMMAND_CLASS_THERMOSTAT_SETPOINT',
            dec: 67,
            hex: '0x43'
        },
        {
            name: 'COMMAND_CLASS_THERMOSTAT_FAN_MODE',
            dec: 68,
            hex: '0x44'
        },
        {
            name: 'COMMAND_CLASS_THERMOSTAT_FAN_STATE',
            dec: 69,
            hex: '0x45'
        },
        {
            name: 'COMMAND_CLASS_CLIMATE_CONTROL_SCHEDULE',
            dec: 70,
            hex: '0x46'
        },
        {
            name: 'COMMAND_CLASS_THERMOSTAT_SETBACK',
            dec: 71,
            hex: '0x47'
        },
        {
            name: 'COMMAND_CLASS_DOOR_LOCK_LOGGING',
            dec: 76,
            hex: '0x4C'
        },
        {
            name: 'COMMAND_CLASS_SCHEDULE_ENTRY_LOCK',
            dec: 78,
            hex: '0x4E'
        },
        {
            name: 'COMMAND_CLASS_BASIC_WINDOW_COVERING',
            dec: 80,
            hex: '0x50'
        },
        {
            name: 'COMMAND_CLASS_MTP_WINDOW_COVERING',
            dec: 81,
            hex: '0x51'
        },
        {
            name: 'COMMAND_CLASS_ASSOCIATION_GRP_INFO',
            dec: 89,
            hex: '0x59'
        },
        {
            name: 'COMMAND_CLASS_DEVICE_RESET_LOCALLY',
            dec: 90,
            hex: '0x5A'
        },
        {
            name: 'COMMAND_CLASS_CENTRAL_SCENE',
            dec: 91,
            hex: '0x5B'
        },
        {
            name: 'COMMAND_CLASS_IP_ASSOCIATION',
            dec: 92,
            hex: '0x5C'
        },
        {
            name: 'COMMAND_CLASS_ANTITHEFT',
            dec: 93,
            hex: '0x5D'
        },
        {
            name: 'COMMAND_CLASS_ZWAVEPLUS_INFO',
            dec: 94,
            hex: '0x5E'
        },
        {
            name: 'COMMAND_CLASS_MULTI_CHANNEL_V2',
            dec: 96,
            hex: '0x60'
        },
        {
            name: 'COMMAND_CLASS_MULTI_INSTANCE',
            dec: 96,
            hex: '0x60'
        },
        {
            name: 'COMMAND_CLASS_DOOR_LOCK',
            dec: 98,
            hex: '0x62'
        },
        {
            name: 'COMMAND_CLASS_USER_CODE',
            dec: 99,
            hex: '0x63'
        },
        {
            name: 'COMMAND_CLASS_BARRIER_OPERATOR',
            dec: 102,
            hex: '0x66'
        },
        {
            name: 'COMMAND_CLASS_CONFIGURATION',
            dec: 112,
            hex: '0x70'
        },
        {
            name: 'COMMAND_CLASS_CONFIGURATION_V2',
            dec: 112,
            hex: '0x70'
        },
        {
            name: 'COMMAND_CLASS_ALARM',
            dec: 113,
            hex: '0x71'
        },
        {
            name: 'COMMAND_CLASS_MANUFACTURER_SPECIFIC',
            dec: 114,
            hex: '0x72'
        },
        {
            name: 'COMMAND_CLASS_POWERLEVEL',
            dec: 115,
            hex: '0x73'
        },
        {
            name: 'COMMAND_CLASS_PROTECTION',
            dec: 117,
            hex: '0x75'
        },
        {
            name: 'COMMAND_CLASS_PROTECTION_V2',
            dec: 117,
            hex: '0x75'
        },
        {
            name: 'COMMAND_CLASS_LOCK',
            dec: 118,
            hex: '0x76'
        },
        {
            name: 'COMMAND_CLASS_NODE_NAMING',
            dec: 119,
            hex: '0x77'
        },
        {
            name: 'COMMAND_CLASS_FIRMWARE_UPDATE_MD',
            dec: 122,
            hex: '0x7A'
        },
        {
            name: 'COMMAND_CLASS_GROUPING_NAME',
            dec: 123,
            hex: '0x7B'
        },
        {
            name: 'COMMAND_CLASS_REMOTE_ASSOCIATION_ACTIVATE',
            dec: 124,
            hex: '0x7C'
        },
        {
            name: 'COMMAND_CLASS_REMOTE_ASSOCIATION',
            dec: 125,
            hex: '0x7D'
        },
        {
            name: 'COMMAND_CLASS_BATTERY',
            dec: 128,
            hex: '0x80'
        },
        {
            name: 'COMMAND_CLASS_CLOCK',
            dec: 129,
            hex: '0x81'
        },
        {
            name: 'COMMAND_CLASS_HAIL',
            dec: 130,
            hex: '0x82'
        },
        {
            name: 'COMMAND_CLASS_WAKE_UP',
            dec: 132,
            hex: '0x84'
        },
        {
            name: 'COMMAND_CLASS_WAKE_UP_V2',
            dec: 132,
            hex: '0x84'
        },
        {
            name: 'COMMAND_CLASS_ASSOCIATION',
            dec: 133,
            hex: '0x85'
        },
        {
            name: 'COMMAND_CLASS_ASSOCIATION_V2',
            dec: 133,
            hex: '0x85'
        },
        {
            name: 'COMMAND_CLASS_VERSION',
            dec: 134,
            hex: '0x86'
        },
        {
            name: 'COMMAND_CLASS_INDICATOR',
            dec: 135,
            hex: '0x87'
        },
        {
            name: 'COMMAND_CLASS_PROPRIETARY',
            dec: 136,
            hex: '0x88'
        },
        {
            name: 'COMMAND_CLASS_LANGUAGE',
            dec: 137,
            hex: '0x89'
        },
        {
            name: 'COMMAND_CLASS_TIME',
            dec: 138,
            hex: '0x8A'
        },
        {
            name: 'COMMAND_CLASS_TIME_PARAMETERS',
            dec: 139,
            hex: '0x8B'
        },
        {
            name: 'COMMAND_CLASS_GEOGRAPHIC_LOCATION',
            dec: 140,
            hex: '0x8C'
        },
        {
            name: 'COMMAND_CLASS_COMPOSITE',
            dec: 141,
            hex: '0x8D'
        },
        {
            name: 'COMMAND_CLASS_MULTI_CHANNEL_ASSOCIATION_V2',
            dec: 142,
            hex: '0x8E'
        },
        {
            name: 'COMMAND_CLASS_MULTI_INSTANCE_ASSOCIATION',
            dec: 142,
            hex: '0x8E'
        },
        {
            name: 'COMMAND_CLASS_MULTI_CMD',
            dec: 143,
            hex: '0x8F'
        },
        {
            name: 'COMMAND_CLASS_ENERGY_PRODUCTION',
            dec: 144,
            hex: '0x90'
        },
        {
            name: 'COMMAND_CLASS_MANUFACTURER_PROPRIETARY',
            dec: 145,
            hex: '0x91'
        },
        {
            name: 'COMMAND_CLASS_SCREEN_MD',
            dec: 146,
            hex: '0x92'
        },
        {
            name: 'COMMAND_CLASS_SCREEN_MD_V2',
            dec: 146,
            hex: '0x92'
        },
        {
            name: 'COMMAND_CLASS_SCREEN_ATTRIBUTES',
            dec: 147,
            hex: '0x93'
        },
        {
            name: 'COMMAND_CLASS_SCREEN_ATTRIBUTES_V2',
            dec: 147,
            hex: '0x93'
        },
        {
            name: 'COMMAND_CLASS_SIMPLE_AV_CONTROL',
            dec: 148,
            hex: '0x94'
        },
        {
            name: 'COMMAND_CLASS_AV_CONTENT_DIRECTORY_MD',
            dec: 149,
            hex: '0x95'
        },
        {
            name: 'COMMAND_CLASS_AV_RENDERER_STATUS',
            dec: 150,
            hex: '0x96'
        },
        {
            name: 'COMMAND_CLASS_AV_CONTENT_SEARCH_MD',
            dec: 151,
            hex: '0x97'
        },
        {
            name: 'COMMAND_CLASS_SECURITY',
            dec: 152,
            hex: '0x98'
        },
        {
            name: 'COMMAND_CLASS_AV_TAGGING_MD',
            dec: 153,
            hex: '0x99'
        },
        {
            name: 'COMMAND_CLASS_IP_CONFIGURATION',
            dec: 154,
            hex: '0x9A'
        },
        {
            name: 'COMMAND_CLASS_ASSOCIATION_COMMAND_CONFIGURATION',
            dec: 155,
            hex: '0x9B'
        },
        {
            name: 'COMMAND_CLASS_SENSOR_ALARM',
            dec: 156,
            hex: '0x9C'
        },
        {
            name: 'COMMAND_CLASS_SILENCE_ALARM',
            dec: 157,
            hex: '0x9D'
        },
        {
            name: 'COMMAND_CLASS_SENSOR_CONFIGURATION',
            dec: 158,
            hex: '0x9E'
        },
        {
            name: 'COMMAND_CLASS_MARK',
            dec: 139,
            hex: '0xEF'
        },
        {
            name: 'COMMAND_CLASS_NON_INTEROPERABLE',
            dec: 140,
            hex: '0xF0'
        }
    ];

}

let ZWaveCommandClassesInstance = new ZWaveCommandClasses();
export default ZWaveCommandClassesInstance;