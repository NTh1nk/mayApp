export function geocodeAddress(address, callback) {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: address }, function(results, status) {
        if (status === 'OK' && results[0]) {
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();
            callback({ lat, lng }); // return coordinates through the callback
        } else {
            console.error('Geocode failed: ' + status);
            callback(null); // return null on failure
        }
    });
}
