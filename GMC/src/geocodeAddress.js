
export function geocodeAddress(address){
    return new Promise((resolve, reject) =>{
       fetch(`/api/geocode?address=${encodeURIComponent(address)}`)

            .then(res => res.json())
            .then(data =>{
                if(data.lat && data.lng){
                    const lat = data.lat;
                    const lng = data.lng;

                    console.log("Coordinates", data.lat, data.lng)
                    
                    resolve({ lat, lng });

                } else{
                    //error
                    reject(new Error('Geocode failed: No results found.'));
                }
            })
            .catch(error => {
                reject(new Error('Geocode failed: ' + error.message));

            });



    });
    

}

