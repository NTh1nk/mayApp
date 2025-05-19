//Use serverless vercel functions

//req = requst, res = response
export default async function handler(req, res){


    const { address } =  req.query;
    
    //query validation
    if (!address) {
        //throw an error if !address
        res.status(400).json({ error:"Missing address query paramenter"});
        return;

    }
    //apikey

    const apiKey = process.env.OPENCAGE_API_KEY;
    //same as earlier, but now we make sure, that we have the api key
    if (!apiKey) {
            //throw an error if !address
            res.status(500).json({ error:"Missing API key"});
            return;

    }

    //url for opencage API
    //uses the address, and api key from early
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

    //now we call the API
    try
    {
        const response = await fetch(url);
        const data = await response.json();

        //check if we have the data results
        if (data.results && data.results.length > 0){
            //get the lattiude and longitude.
            const { lat, lng } = data.results[0].geometry;

            //return the coords
            //200 means succesfull request
            res.status(200).json( { lat, lng });
            
            //if we dont have data results
        } else {
            res.status(404).json({ error: "No results found"});
        }

        //catch the error
    } catch(error){

        res.status(500).json({ error: "Failed to fetch geocoded data"})
    }

}
