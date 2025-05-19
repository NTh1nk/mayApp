import './style.css';
import '../public/globe.js';
import { processInput } from './processInput.js';

// Wait for DOM ready to be safe
window.addEventListener('DOMContentLoaded', () => {
  window.processInput = processInput;
  console.log("processInput is now global");
});
