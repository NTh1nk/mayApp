import './style.css';
import { processInput } from './processInput.js';
import { initGlobe } from './globe.js';
import { markers } from './placeMarker.js';

async function handleInsert(event) {
  event.preventDefault();

  // Process input (adds row, returns data)
  const inputData = await processInput(event);
  if (!inputData) return;

  // Get updated markers array including the new input
  const updatedMarkers = await markers();

  // Reinitialize the globe with new markers
  initGlobe({ coordinateArray: updatedMarkers });

  // Clear inputs and refocus
  const locationInput = document.getElementById("location");
  const amountInput = document.getElementById("amount");

  locationInput.value = '';
  amountInput.value = '';
  locationInput.focus();
}

// Attach event listener after DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  window.processInput = processInput;
  document.getElementById('insertBtn').addEventListener('click', handleInsert);

  // Initialize globe with no markers
  initGlobe({ coordinateArray: [] });
});
