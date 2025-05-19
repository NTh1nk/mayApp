// globe.js — must be in /Modules/globe.js

import Globe from 'https://cdn.jsdelivr.net/npm/globe.gl@2.31.8/+esm';
import { TextureLoader, ShaderMaterial, Vector2 } from 'https://esm.sh/three';
import * as solar from 'https://esm.sh/solar-calculator';

export function initGlobe(globeId, timeId) {
  const VELOCITY = 1; // minutes per frame
  const container = document.getElementById(globeId);
  const timeEl = document.getElementById(timeId);

  const dayNightShader = {
    vertexShader: `...`, // truncated here for brevity
    fragmentShader: `...`
  };

  const sunPosAt = dt => {
    const day = new Date(+dt).setUTCHours(0, 0, 0, 0);
    const t = solar.century(dt);
    const longitude = (day - dt) / 864e5 * 360 - 180;
    return [longitude - solar.equationOfTime(t) / 4, solar.declination(t)];
  };

  let dt = +new Date();
  const world = Globe()(container);

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
      .onZoom(({ lng, lat }) => material.uniforms.globeRotation.value.set(lng, lat));

    requestAnimationFrame(function animate() {
      dt += VELOCITY;
      timeEl.textContent = new Date(dt).toLocaleString();
      material.uniforms.sunPosition.value.set(...sunPosAt(dt));
      requestAnimationFrame(animate);
    });
  });
}
