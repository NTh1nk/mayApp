//Random US Address
const address = "403 Pallet Street";

fetch("/api/geocode?address=${encodeURIComponent(address)}")
    .then(res => res.json())
    .then(data =>{
        if(data.lat && data.lng){
            //log error
            console.log("Coordinates", data.lat, data.lng)

        } else{
            //error
            console.log("error coordinates not found", data.error);
        }
    });


