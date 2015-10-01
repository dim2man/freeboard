(function (freeboard, $, _) {
    var DroneListPlugin = function(settings) {
        var self = this;

        var listContainer = $('<select style="width:100%; heihgt:100%; margin-top:25px;" onChange="changeFunction(this)"><option value="1">Drone 1</option><option value="2">Drone 2</option><option value="3">Drone 3</option></select>');

        self.render = function(containerElement) {
            console.log('render');
            $(containerElement).append(listContainer);
        };

        self.getHeight = function() {
            return 2;
        };

        self.onSettingsChanged = function(newSettings) {
            // just update the original ones
            console.log('onSettingsChanged, ' + newSettings);
            settings = newSettings;
        };

        self.onCalculatedValueChanged = function(settingName, newValue) {
            console.log('onCalculatedValueChanged, ' + settingName + '=' + newValue);
        };

        self.onDispose = function() {
            // any cleanup
        };
    };


    freeboard.loadWidgetPlugin({
        'type_name': 'my_listDrones_plugin',
        'display_name': 'List of Drones',
        'description': 'This plugin is for selecting of drones',
        'fill_size': false,
        'settings': {},
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new DroneListPlugin(settings));
        }
    });

})(freeboard, $, _);