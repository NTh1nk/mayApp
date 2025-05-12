require('dotenv').config();
const fetch = require('node-fetch'); // Make sure to install node-fetch

const apiKey = process.env.OPENCAGE_API_KEY;

function geocodeAddress(address) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results[0]) {
                    const lat = data.results[0].geometry.lat;
                    const lng = data.results[0].geometry.lng;
                    resolve({ lat, lng });
                } else {
                    reject(new Error('Geocode failed: No results found.'));
                }
            })
            .catch(error => {
                reject(new Error('Geocode failed: ' + error));
            });
    });
}

const address = "Evanstonevej 8";
geocodeAddress(address)
    .then(coords => console.log(coords))
    .catch(error => console.error(error));
