import './style.css';
import { processInput } from './processInput.js';
import { initGlobe } from './globe.js';
import { markers } from './placeMarker.js';


const insertButton = document.getElementById("insertButton");
async function handleInsert(event) {
  event.preventDefault();

  // Process input (adds row, returns data)
  const inputData = await processInput(event);

  if (!inputData) return;

  // Get updated markers array including the new input
  const updatedMarkers = await markers();

  // Reinitialize the globe with new markers
  initGlobe({ coordinateArray: updatedMarkers });

  // Optionally clear inputs or focus on location input
  locationInput.value = '';
  amountInput.value = '';
  locationInput.focus();
}

// Attach event listener to Insert button (replace with actual selector)
document.querySelector('.button').addEventListener('click', handleInsert);

// Initialize globe once with no markers or with default markers on page load
initGlobe({ coordinateArray: [] });


window.addEventListener('DOMContentLoaded', () => {
  window.processInput = processInput;
  document.getElementById('insertBtn').addEventListener('click', handleInsert);

});
