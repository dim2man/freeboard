(function(freeboard, $, _) {

  // async google maps load
  var pendingMaps = [];
  window.gmapLoadedCallback = function() {
    delete window.gmapLoadedCallback;
    for(var i=0; i<pendingMaps.length; i++) {
      try {
        pendingMaps[i](true);
      } catch(e) {
        console.error('Failed to create google map', e);
      }
    }
  }

  // gmap plugin
  var GMapPlugin = function(settings) {
    var self = this;

    var mapContainer = $('<div style="width:100%;height:100%;"></div>');

    var position = {
      lat: undefined,
      lng: undefined
    };

    var map, marker, circle, polyline, path;

    function createMap(force) {
      if (force || (google && google.maps && google.maps.Map)) {
        map = new google.maps.Map(mapContainer[0], {
          center: {lat: 37.388458, lng: -121.967159},
          zoom: 16
        });
      } else {
        pendingMaps.push(createMap);
      }
    }

    self.render = function(containerElement) {
      $(containerElement).append(mapContainer);
      createMap();
    }

    self.getHeight = function() {
      return 4;
    }

    self.onSettingsChanged = function(newSettings) {
      // just update the original ones
      settings = newSettings;
    }

    self.onCalculatedValueChanged = function(settingName, newValue) {
      if(settingName in position) {
        position[settingName] = newValue;
      }
      if(map && $.isNumeric(position.lat) && $.isNumeric(position.lng)) {
        if(path && polyline) {
          path.push(new google.maps.LatLng(position.lat, position.lng));
        } else {
          path = new google.maps.MVCArray([new google.maps.LatLng(position.lat, position.lng)]);
          polyline = new google.maps.Polyline({
            map: map,
            path: path,
            strokeColor: '#0000ff',
            strokeOpacity: 0.8,
            strokeWeight: 6
          });
        }
        if(circle) {
          circle.setCenter(position);
          circle.setRadius(40*Math.random()+10);
        } else {
          circle = new google.maps.Circle({
            center: position,
            fillColor: '#ffff00',
            fillOpacity: 0.5,
            strokeWeight: 0,
            map: map,
            radius: 40*Math.random()+10
          });
        }
        if(marker) {
          marker.setPosition(position);
        } else {
          marker = new google.maps.Marker({
            position: position, 
            map: map,
            icon: {
              url: 'http://cdn.flaticon.com/png/512/90905.png',
              anchor: new google.maps.Point(16, 16),
              scaledSize: new google.maps.Size(32, 32)
            }
          });
        }
        map.setCenter(position);
      }
    }

    self.onDispose = function() {
      // any cleanup
    }
  }

	freeboard.loadWidgetPlugin({
    'type_name': 'my_gmap_plugin',
    'display_name': 'Google Maps Plugin',
    'description': 'This plugin is for google map injection',
    'external_scripts': ['https://maps.googleapis.com/maps/api/js?v=3&sensor=false&key=&callback=gmapLoadedCallback'],
    'fill_size': false,
    'settings': [
      {
        'name': 'lat',
        'display_name': 'Latitude',
        'type': 'calculated',
        'default_value': '',
        'description': 'Map position latitude'
      },
      {
        'name': 'lng',
        'display_name': 'Longitude',
        'type': 'calculated',
        'default_value': '',
        'description': 'Map position longitude'
      }
    ],
    newInstance: function(settings, newInstanceCallback)
    {
      newInstanceCallback(new GMapPlugin(settings));
    }
  });

})(freeboard, $, _);