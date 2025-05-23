const markerSvg = `<svg viewBox="-4 0 36 36">
  <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
  <circle fill="black" cx="14" cy="14" r="7"></circle>
</svg>`;

export function coToMarker(coordinates) {
    console.log('coToMarker input:', coordinates);
    const amount = Number(coordinates.amount) || 1;
    console.log('amount:', amount);
    return {
        lat: coordinates.lat,
        lng: coordinates.lng,
        size: coordinates.amount * 5,
        color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
        markerSvg
    };
}
    