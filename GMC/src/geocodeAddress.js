function geocodeAddress(address, callback) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, function(results, status) {
      if (status === 'OK') {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        callback({ lat, lng });
        } else {
          console.error('Geocode failed: ' + status);
          callback(null);
        }
      });
    }      
