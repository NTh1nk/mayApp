/*

require('env/dotenv').config();  // Load environment variables from .env file


//require doenst work in npm    
const fetch = require("node-fetch");
// Access the OpenCage API key from the environment variable
const apiKey = process.env.OPENCAGE_API_KEY;

export function geocodeAddress(address) {
    // OpenCage API endpoint
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
*/