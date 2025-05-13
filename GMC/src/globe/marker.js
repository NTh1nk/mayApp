export function coToMarker(coordinates) {
    return {
        lat: coordinates.lat,
        lng: coordinates.lng,
        size: coordinates.amount * 5,
        color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
    };
}
   