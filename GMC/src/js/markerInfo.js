import tzLookup from 'tz-lookup';

export function localTimeMarkerInfo(markers, OMT) {
  markers.forEach(marker => {
    const timeZone = tzLookup(marker.lat, marker.lng);
    const date = new Date(Date.UTC(2000, 0, 1, 0, OMT));
    marker.localTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone,
      hour12: false
    });
    marker.infoBox = `Local Time: ${marker.localTime} (${timeZone})`;
  });
}