import Globe from 'https://unpkg.com/globe.gl@2.32.9/dist/globe.gl.js';
import { TextureLoader, ShaderMaterial, Vector2 } from 'https://unpkg.com/three@0.152.2/build/three.module.js';
import * as solar from 'https://unpkg.com/solar-calculator@1.0.5/dist/solar-calculator.module.js';
import { coToMarker } from './marker.js';

export function initGlobe({ coordinateArray = [] } = {}) {
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
    .htmlElementVisibilityModifier((el, v) => el.style.opacity = v ? 1 : 0);

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
  });
}
