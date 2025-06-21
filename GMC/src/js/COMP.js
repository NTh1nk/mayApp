import { compress } from "three/examples/jsm/libs/fflate.module.js";

const candidateCities = [
  { name: 'London', lat: 51.5074, lng: -0.1278 },
  { name: 'New York', lat: 40.7128, lng: -74.0060 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  // Add more capitals here
];

function distance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Assuming `participants` is an array of objects with {lat, lng}
export function cOMP(candidateCities, participants) {
  const cityScores = candidateCities.map(city => {
    let totalDistance = 0;
    for (const p of participants) {
      totalDistance += distance(p.lat, p.lng, city.lat, city.lng) * (p.amount || 1);
    }
    return { city: city.name, totalDistance };
  });

  cityScores.sort((a, b) => a.totalDistance - b.totalDistance);

  for (let i = 0; i < cityScores.length; i++) {
    localStorage.setItem(`hQ_${i}`, JSON.stringify(cityScores[i]));
    console.log(`City: ${cityScores[i].city}, Total Distance: ${cityScores[i].totalDistance.toFixed(2)} km`);

  }
  console.log('Optimal meeting city:', cityScores[0].city);
  return cityScores[0].city;
}

// Example usage:
const participants = [
  { lat: 55.6761, lng: 12.5683 }, // Copenhagen
  { lat: 48.8566, lng: 2.3522 },  // Paris
  { lat: 40.7128, lng: -74.0060 }, // NYC
];

//cOMP(candidateCities, participants);