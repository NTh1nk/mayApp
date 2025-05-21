

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

}