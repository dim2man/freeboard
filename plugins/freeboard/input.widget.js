(function(freeboard, $) {

  var InputWidget = function(settings) {
    var self = this;

    var $input = $('<input type="text" style="width:100%;box-sizing:border-box;" />');

    var state;

    $input.val(settings.value);
    $input.on('input', function() {
      if(typeof state == 'function') {
        state($input.val());
      }
    });

    self.render = function(containerElement) {
      $(containerElement).append($input);
    }

    self.getHeight = function() {
      return 1;
    }

    self.onSettingsChanged = function(newSettings) {
      // just update the original ones
      settings = newSettings;
      $input.val(settings.value);
    }

    self.onCalculatedValueChanged = function(settingName, newValue) {
      if(settingName === 'state' && typeof newValue == 'function') {
        state = newValue;
        $input.val(state());
      }
    }

    self.onDispose = function() {
      // any cleanup
      $input.off('input');
    }
  }

	freeboard.loadWidgetPlugin({
    'type_name': 'my_input_widget',
    'display_name': 'Input widget',
    'description': 'This plugin is just simple input box',
    'fill_size': false,
    'settings': [
      {
        'name': 'state',
        'display_name': 'State',
        'type': 'calculated',
        'default_value': null,
        'description': 'State to be changed on input field update'
      },
      {
        'name': 'value',
        'display_name': 'Initial value',
        'type': 'text',
        'default_value': '',
        'description': 'Initial value for input field'
      }
    ],
    newInstance: function(settings, newInstanceCallback)
    {
      newInstanceCallback(new InputWidget(settings));
    }
  });

})(freeboard, $);