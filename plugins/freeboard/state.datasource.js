(function(freeboard, ko) {

	var StateDatasource = function(settings, updateCallback) {
    var self = this;

    var state = ko.observable(settings.value);

    var subscription = state.subscribe(function(newValue) {
      updateCallback(state);
    });

    self.onSettingsChanged = function(newSettings) {
      settings = newSettings;
      state(settings.value);
    }

    self.updateNow = function() {
      updateCallback(state);
    }

    self.onDispose = function() {
      subscription.dispose();
    }
  }

  freeboard.loadDatasourcePlugin({
    'type_name': 'StateDatasource',
    'display_name': 'State Datasource',
    'description': 'Shared read/write state datasource for widgets',
    'settings': [
      {
        'name': 'value',
        'display_name': 'Initial value',
        'type': 'text',
        'default_value': '',
        'description': 'Initial value for the state'
      }
    ],
    newInstance: function(settings, newInstanceCallback, updateCallback) {
      newInstanceCallback(new StateDatasource(settings, updateCallback));
    }
  });

})(freeboard, ko);