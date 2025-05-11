import { geocodeAddress } from "./geocodeAddress";
import { processInput } from "./processInput";


export function markers(){
 

    // import geolocated position
    let address = processInput();
    let coordinateList = geocodeAddress(address);
    const markerData = [];

    for(let i = 0; i< coordinateList.lenght;)//amoubt of addreses)
    {   
        const marker = coToMarker(coordinateList[i]);
        markerData.push(marker);

    }
    //30 random example markers
    const N = 30;
    const gData = [...Array(N).keys()].map(() => ({
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        size: 7 + Math.random() * 30,
        color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
        }));
    return gData; //change this up when finished

}



function coToMarker(coordinates){

    const marker =  {
        lat: coordinates.lat,
        lng: coordinates.lng,
        size: coordinates.amount * 5,// make this scale with the amount of people
        color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
    }
    return marker;
}