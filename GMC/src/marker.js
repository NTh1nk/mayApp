
export function generateMarkers({ amount, coords }) {
    if (!coords || typeof amount !== 'number') {
        console.error("Invalid input to generateMarkers:", { amount, coords });
        return [];
    }

    const primaryMarker = {
        lat: coords.lat,
        lng: coords.lng,
        size: amount * 5,
        color: getRandomColor()
    };

    const N = 5;
    const exampleMarkers = Array.from({ length: N }, () => ({
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        size: 7 + Math.random() * 30,
        color: getRandomColor()
    }));

    return [primaryMarker, ...exampleMarkers];
}

function getRandomColor() {
    const colors = ['red', 'white', 'blue', 'green'];
    return colors[Math.floor(Math.random() * colors.length)];
}