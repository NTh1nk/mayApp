import Globe from 'globe.gl';
import { csvParseRows } from 'https://esm.sh/d3-dsv';
import indexBy from 'https://esm.sh/index-array-by';
export function initGlobeRoute() {
  const COUNTRY = 'United States';
  const OPACITY = 0.22;

  const myGlobe = new Globe(document.getElementById('globeViz'))

    .globeImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg')
    .pointOfView({ lat: 39.6, lng: -98.5, altitude: 2 }) // aim at continental US centroid

    .arcLabel(d => `${d.airline}: ${d.srcIata} &#8594; ${d.dstIata}`)
    .arcStartLat(d => +d.srcAirport.lat)
    .arcStartLng(d => +d.srcAirport.lng)
    .arcEndLat(d => +d.dstAirport.lat)
    .arcEndLng(d => +d.dstAirport.lng)
    .arcDashLength(0.25)
    .arcDashGap(1)
    .arcDashInitialGap(() => Math.random())
    .arcDashAnimateTime(4000)
    .arcColor(d => [`rgba(0, 255, 0, ${OPACITY})`, `rgba(255, 0, 0, ${OPACITY})`])
    .arcsTransitionDuration(0)

    .pointColor(() => 'orange')
    .pointAltitude(0)
    .pointRadius(0.02)
    .pointsMerge(true);

  // load data

  const airportParse = ([airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source]) => ({ airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source });
  const routeParse = ([airline, airlineId, srcIata, srcAirportId, dstIata, dstAirportId, codeshare, stops, equipment]) => ({ airline, airlineId, srcIata, srcAirportId, dstIata, dstAirportId, codeshare, stops, equipment});

  Promise.all([
    fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat').then(res => res.text())
      .then(d => csvParseRows(d, airportParse)),
    fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/routes.dat').then(res => res.text())
      .then(d => csvParseRows(d, routeParse))
  ]).then(([airports, routes]) => {

    const byIata = indexBy(airports, 'iata', false);

    const filteredRoutes = routes
      .filter(d => byIata.hasOwnProperty(d.srcIata) && byIata.hasOwnProperty(d.dstIata)) // exclude unknown airports
      .filter(d => d.stops === '0') // non-stop flights only
      .map(d => Object.assign(d, {
        srcAirport: byIata[d.srcIata],
        dstAirport: byIata[d.dstIata]
      }))
      .filter(d => d.srcAirport.country === COUNTRY && d.dstAirport.country !== COUNTRY); // international routes from country

    myGlobe
      .pointsData(airports)
      .arcsData(filteredRoutes);
  });

}