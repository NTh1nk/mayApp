import { geocodeAddress } from "./geocodeAddress";
import { processInput } from "./processInput";


export function markers(){
 

    // import geolocated position
    let address = processInput();
    let coordinates = geocodeAddress();
    let numberOfCoodinates = 1;
    const ngData = []

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
        size: 15,// make this scale with the amount of people
        color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
    }
    return marker;
}