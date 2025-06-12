import Globe from 'globe.gl';
import { TextureLoader, ShaderMaterial, Vector2 } from 'three';
import * as solar from 'solar-calculator';
//import { coToMarker } from './marker.js';
import { csvParseRows } from 'https://esm.sh/d3-dsv';
import indexBy from 'https://esm.sh/index-array-by';

export function initGlobe({ coordinateArray = [], arcArray = [] } = {}) {

  //const COUNTRY = 'Denmark';
  const OPACITY = 0.6;

  const VELOCITY = 1; // minutes per frame
  const dayNightShader = {
    vertexShader: `
      varying vec3 vNormal;
      varying vec2 vUv;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      #define PI 3.141592653589793
      uniform sampler2D dayTexture;
      uniform sampler2D nightTexture;
      uniform vec2 sunPosition;
      uniform vec2 globeRotation;
      varying vec3 vNormal;
      varying vec2 vUv;

      float toRad(in float a) {
        return a * PI / 180.0;
      }

      vec3 Polar2Cartesian(in vec2 c) {
        float theta = toRad(90.0 - c.x);
        float phi   = toRad(90.0 - c.y);
        return vec3(
          sin(phi) * cos(theta),
          cos(phi),
          sin(phi) * sin(theta)
        );
      }

      void main() {
        float invLon = toRad(globeRotation.x);
        float invLat = -toRad(globeRotation.y);
        mat3 rotX = mat3(
          1, 0, 0,
          0, cos(invLat), -sin(invLat),
          0, sin(invLat), cos(invLat)
        );
        mat3 rotY = mat3(
          cos(invLon), 0, sin(invLon),
          0, 1, 0,
          -sin(invLon), 0, cos(invLon)
        );
        vec3 sunDir = rotX * rotY * Polar2Cartesian(sunPosition);
        float intensity = dot(normalize(vNormal), normalize(sunDir));
        vec4 dayColor = texture2D(dayTexture, vUv);
        vec4 nightColor = texture2D(nightTexture, vUv);
        float blend = smoothstep(-0.1, 0.1, intensity);
        gl_FragColor = mix(nightColor, dayColor, blend);
      }
    `
  };

  // Setup marker data
  const gData = coordinateArray;
  let dt = Date.now();
  const timeEl = document.getElementById('time') || { textContent: '' };
  // Initialize Globe
  const world = new Globe(document.getElementById('globeViz'))



    .htmlElementsData(gData)
    .htmlElement(d => {
      const el = document.createElement('div');
      el.innerHTML = d.markerSvg;
      el.style.color = d.color;
      el.style.width = `${d.size}px`;
      el.style.transition = 'opacity 250ms';
      el.className = 'marker';
      const infoBox = document.createElement('div');
      infoBox.className = 'infoBox';
      infoBox.textContent = d.info;
      el.appendChild(infoBox);
      return el;
    })
    .htmlElementVisibilityModifier((el, v) => el.style.opacity = v ? 1 : 0)

    //arc routes

    
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
    .pointsMerge(true)
    .arcStroke(1.5)
    //.pointOfView({ lat: 39.6, lng: -98.5, altitude: 2 }); //this is the point of view

  // Load textures and start animation
  Promise.all([
    new TextureLoader().loadAsync('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-day.jpg'),
    new TextureLoader().loadAsync('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg')
  ]).then(([dayTexture, nightTexture]) => {
    const material = new ShaderMaterial({
      uniforms: {
        dayTexture: { value: dayTexture },
        nightTexture: { value: nightTexture },
        sunPosition: { value: new Vector2() },
        globeRotation: { value: new Vector2() }
      },
      vertexShader: dayNightShader.vertexShader,
      fragmentShader: dayNightShader.fragmentShader
    });

    world
      .globeMaterial(material)
      .backgroundImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png')
      .onZoom(({ lng, lat }) => material.uniforms.globeRotation.value.set(lng, lat));

    (function animate() {
      dt += VELOCITY;
      timeEl.textContent = new Date(dt).toLocaleString();
      const day = new Date(dt).setUTCHours(0,0,0,0);
      const t   = solar.century(dt);
      const lon = ((day - dt)/864e5)*360 - 180;
      const sunPos = [lon - solar.equationOfTime(t)/4, solar.declination(t)];
      material.uniforms.sunPosition.value.set(...sunPos);
      requestAnimationFrame(animate);
    })();

    
  // load data

    const airportParse = ([airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source]) => ({ airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source });
    //const routeParse = ([airline, airlineId, srcIata, srcAirportId, dstIata, dstAirportId, codeshare, stops, equipment]) => ({ airline, airlineId, srcIata, srcAirportId, dstIata, dstAirportId, codeshare, stops, equipment});

    /*    
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
      */
     // Fetch only airports, no routes
     /*
      fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat')
        .then(res => res.text())
        .then(data => {
          const airports = csvParseRows(data, airportParse);
        */
        world
        .pointsData(coordinateArray)
        //when this is commented out, there is no routes by default
        //.arcsData(filteredRoutes);
        .arcsData(arcArray);
    

    });
}
