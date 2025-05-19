//Should take the coords, and get the timezone

//Using node tz lookup
const tz_lookup = require("tz-lookup");
const tz = require("tz-lookup");


//import coords from geocache in prod.
//Example coords

let coords = { lat: 55.722842, lng: 12.579473, amount:35 }


//log timezone

console.log(tz_lookup(coords.lat, coords.lng));