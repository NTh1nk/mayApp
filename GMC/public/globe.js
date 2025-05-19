import { TextureLoader, ShaderMaterial, Vector2 } from 'https://esm.sh/three';
import * as solar from 'https://esm.sh/solar-calculator';
import {coToMarker} from "../src/marker.js";
    const VELOCITY = 1; // minutes per frame

    // Custom shader:  Blends night and day images to simulate day/night cycle
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

        vec3 Polar2Cartesian(in vec2 c) { // [lng, lat]
          float theta = toRad(90.0 - c.x);
          float phi = toRad(90.0 - c.y);
          return vec3( // x,y,z
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
          vec3 rotatedSunDirection = rotX * rotY * Polar2Cartesian(sunPosition);
          float intensity = dot(normalize(vNormal), normalize(rotatedSunDirection));
          vec4 dayColor = texture2D(dayTexture, vUv);
          vec4 nightColor = texture2D(nightTexture, vUv);
          float blendFactor = smoothstep(-0.1, 0.1, intensity);
          gl_FragColor = mix(nightColor, dayColor, blendFactor);
        }
      `
    };

    //Markers
            
        const markerSvg = `<svg viewBox="-4 0 36 36">
            <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
            <circle fill="black" cx="14" cy="14" r="7"></circle>
        </svg>`;

     
    let coordinates = 
    //these should be imported from input.
    { lat: 55.722842, lng: 12.579473, amount:35 }


    let coordinateArray = [    
      {lat: 15.722842, lng: 22.579473, amount:10 },
      { lat: 55.722842, lng: 12.579473, amount:15 }

];

    //should maybe init as other
    const gData = [];
  

    for(let i = 0; i < coordinateArray.length; i++){
      gData.push(coToMarker(coordinateArray[i]));
      
    }
   
  //end of markers

    const sunPosAt = dt => {
      const day = new Date(+dt).setUTCHours(0, 0, 0, 0);
      const t = solar.century(dt);
      const longitude = (day - dt) / 864e5 * 360 - 180;
      return [longitude - solar.equationOfTime(t) / 4, solar.declination(t)];
    };

    let dt = +new Date();
    const timeEl = document.getElementById('time');

    const world = new Globe(document.getElementById('globeViz'))

    //markers
    .htmlElementsData(gData)
    .htmlElement(d => {
      const el = document.createElement('div');
      el.innerHTML = markerSvg;
      el.style.color = d.color;
      el.style.width = `${d.size}px`;
      el.style.transition = 'opacity 250ms';
      el.className = "marker";

      el.style['pointer-events'] = 'auto';
      el.style.cursor = 'pointer';

      const infoBox = document.createElement("div");
      infoBox.className = "infoBox";
      infoBox.textContent = "This is filler content";
      el.appendChild(infoBox);
      el.onclick = () => console.info(d);
      return el;
    })
    .htmlElementVisibilityModifier((el, isVisible) => el.style.opacity = isVisible ? 1 : 0);;
    //markers
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

      world.globeMaterial(material)
        .backgroundImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png')
        // Update globe rotation on shader
        .onZoom(({ lng, lat }) => material.uniforms.globeRotation.value.set(lng, lat));

      requestAnimationFrame(() =>
        (function animate() {
          // animate time of day
          dt += VELOCITY;
         //t += VELOCITY * 60 * 1000;
         //sped up

          timeEl.textContent = new Date(dt).toLocaleString();
          material.uniforms.sunPosition.value.set(...sunPosAt(dt));
          requestAnimationFrame(animate);
        })()
      );
    });