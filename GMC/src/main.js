import './style.css';
import { processInput } from './processInput.js';
import { initGlobe } from './globe.js'; 


// Wait for DOM ready to be safe
window.addEventListener('DOMContentLoaded', () => {
  window.processInput = processInput;
  console.log("processInput is now global");
  
  initGlobe();//start the globe

});
