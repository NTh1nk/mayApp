import { geocodeAddress } from "./geocodeAddress";
import { processInput } from "./processInput";

export async function markers() {
    const result = await processInput();

    if (!result || !result.coords) {
        console.error("Invalid result from processInput:", result);
        return [];
    }

    const { address, amount, coords } = result;

    try {
        coords.amount = amount;

        const marker = coToMarker(coords);

        // Optional: Add 5 random example markers
        const N = 5;
        const gData = [...Array(N).keys()].map(() => ({
            lat: (Math.random() - 0.5) * 180,
            lng: (Math.random() - 0.5) * 360,
            size: 7 + Math.random() * 30,
            color: ['red', 'white', 'blue', 'green'][Math.floor(Math.random() * 4)]
        }));

        return [marker, ...gData];

    } catch (error) {
        console.error("Geocoding failed in try block:", error);
        return [];
    }
}


function coToMarker(coordinates) {
    return {
        lat: coordinates.lat,
        lng: coordinates.lng,
        size: coordinates.amount * 5,
        color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
    };
}
