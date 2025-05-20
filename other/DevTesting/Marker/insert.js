
async function markers(input) {

    if(!input||!input.coords) {
        console.error("Invalid result from processInput:", input);
        return [];
    }
    const { address, amount } = input;

    try {
        coords.amount = amount;

        const marker = coToMarker(coordinates);

        // Optional: Add 30 random example markers
        const N = 30;
        const gData = [...Array(N).keys()].map(() => ({
            lat: (Math.random() - 0.5) * 180,
            lng: (Math.random() - 0.5) * 360,
            size: 7 + Math.random() * 30,
            color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
        }));

        return [marker, ...gData];

    } catch (error) {
        console.error("Geocoding failed:", error);
        return []; // return empty array on failure
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


coordinates = 
    { lat: 55.722842, lng: 12.579473, amount:10 }


coToMarker(coordinates);