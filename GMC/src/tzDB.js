export function getTimeZone(lat, lng) {
    return new Promise((resolve, reject) => {
        fetch(`/api/timeZoneDB?lat=${lat}&lng=${lng}`)
            .then(res => res.json())
            .then(data => {
                if (data.zoneName) {
                    resolve(data.zoneName);
                } else {
                    reject(new Error('Timezone lookup failed: No results found.'));
                }
            })
            .catch(error => {
                reject(new Error('Timezone lookup failed: ' + error.message));
            });
    });
}