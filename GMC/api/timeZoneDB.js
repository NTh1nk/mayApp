export default async function handler(req, res) {
    // Accept lat and lng as query parameters
    const { lat, lng } = req.query;
    console.log("Received lat:", lat, "lng:", lng);
    // Query validation
    if (!lat || !lng) {
        res.status(400).json({ error: "Missing lat or lng query parameter" });
        return;
    }

    // API key
    const apiKey = process.env.TIMEZONEDB_API_KEY;

    if (!apiKey) {
        res.status(500).json({ error: "Missing API key" });
        return;
    }

    const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lng}`;
    
    console.log("URL:", url);
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Response Data:", data);
        if (data.status === "OK") {
            const { zoneName } = data;
            res.status(200).json({ zoneName });
        } else {
            res.status(404).json({ error: "No results found", raw: data });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch timezone data" });
    }
}
