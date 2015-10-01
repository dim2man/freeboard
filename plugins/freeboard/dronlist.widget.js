(function (freeboard, $, _) {
    var DroneListPlugin = function(settings) {
        var self = this;

        var $listContainer = $('<select style="width:100%; heihgt:100%; margin-top:25px;"><option value="1">Drone 1</option><option value="2">Drone 2</option><option value="3">Drone 3</option></select>');

        self.render = function(containerElement) {
            console.log('render');
            $(containerElement).append($listContainer);
        };

        self.getHeight = function() {
            return 2;
        };

        var state;

        $listContainer.on('change', function () {
            if (typeof state == 'function') {
                state($listContainer.val());
            }
            console.log("selected value was changed on " + $listContainer.val());
        });

        self.onSettingsChanged = function(newSettings) {
            // just update the original ones
            console.log('onSettingsChanged, ' + newSettings);
            settings = newSettings;
        };

        self.onCalculatedValueChanged = function (settingName, newValue) {
            if (settingName === 'state' && typeof newValue == 'function') {
                state = newValue;
                $listContainer.val(state());
            }
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
        'settings':[
        {
            'name': 'state',
            'display_name': 'State',
            'type': 'calculated',
            'default_value': null,
            'description': 'State to be changed on selecting new value' 
        }],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new DroneListPlugin(settings));
        }
    });

})(freeboard, $, _);