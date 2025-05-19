import './style.css';
import { processInput } from './processInput.js';
import { initGlobe } from './globe.js';

window.addEventListener('DOMContentLoaded', () => {
  window.processInput = processInput;
  initGlobe();
});
