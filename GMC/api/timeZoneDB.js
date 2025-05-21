

export default async function handler(req, res) {
    const { address } = req.query;

    //query validation
    if (!address) {
        //throw an error if !address
        res.status(400).json({ error: "Missing address query parameter" });
        return;
    }

    //apikey
    const apiKey = process.env.TIMEZONEDB_API_KEY;

    //same as earlier, but now we make sure, that we have the api key
    if (!apiKey) {
        //throw an error if !address
        res.status(500).json({ error: "Missing API key" });
        return;
    }

    const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${address.lat}&lng=${address.lng}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        //check if we have the data results
        if (data.status === "OK") {
            //get the timezone
            const { zoneName } = data;

            //return the timezone
            res.status(200).json({ zoneName });

            //if we dont have data results
        } else {
            res.status(404).json({ error: "No results found", raw: data });
        }

        //catch the error
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch timezone data" });
    }
}
