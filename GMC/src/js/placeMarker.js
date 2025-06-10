import { geocodeAddress } from "./geocodeAddress.js";
import { processInput } from "./processInput.js";

export async function markers(input) {
    
    if(!input || !input.coords) {
        console.error("Invalid input to markers function:", input);
        return [];
    }


    const { address, amount, coords } = input;

    try {
        coords.amount = amount;

        const marker = coToMarker(coords);

        /* Optional: Add 5 random example markers
        const N = 5;
        const gData = [...Array(N).keys()].map(() => ({
            lat: (Math.random() - 0.5) * 180,
            lng: (Math.random() - 0.5) * 360,
            size: 7 + Math.random() * 30,
            color: ['red', 'white', 'blue', 'green'][Math.floor(Math.random() * 4)]
        }));
        */
        return [marker];

    } catch (error) {
        console.error("Geocoding failed in try block:", error);
        return [];
    }
}
const markerSvg = `<svg viewBox="-4 0 36 36">
  <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
  <circle fill="black" cx="14" cy="14" r="7"></circle>
</svg>`;


function coToMarker(coordinates) {
    return {
        lat: coordinates.lat,
        lng: coordinates.lng,
        size: 25 + (coordinates.amount * 5), // Adjust size based on amount
        info: coordinates.infoBox ?? `${coordinates.amount}`,
        //info: `${coordinates.amount} at ${coordinates.lat.toFixed(2)}, ${coordinates.lng.toFixed(2)}`,
        color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
        markerSvg
    };
}
