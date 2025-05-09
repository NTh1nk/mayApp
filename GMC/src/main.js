  import './style.css';
  function processInput(event) {
      if (event) event.preventDefault();
        const location = document.getElementById("location").value;
        const amount = document.getElementById("amount").value;
        console.log("Location:", location);
        console.log("Amount:", amount);
            //  Display it
        alert(`Location: ${location}\nAmount: ${amount}`); 
     

        const address = document.getElementById("location").value;
        const amountFloat = parseFloat(document.getElementById("amount").value);
        geocodeAddress(address, (coords) => {
          if (coords) {
            console.log("Latitude:", coords.lat, "Longitude:", coords.lng, "Amount:", amountFloat);
            // translate cords to add the marker to add a marker, etc.
          } else {
            alert("Invalid address");
          }
        });
        //Reset input fields:
        document.getElementById("location").value = '';
        document.getElementById("amount").value = '';
      }

      //Geocode means to translate an address to coordinates.
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