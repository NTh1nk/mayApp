import './style.css';
import { processInput } from './processInput.js';
import { initGlobe } from './globe.js';
import { markers } from './placeMarker.js';
import data from "./json/markers.json";
import { cOMT } from './COMT.js';

console.log(data);
//let updatedMarkers = [...data];
let updatedMarkers = [];
let addressData = [];
let lastInputData = null;

async function handleInsert(event) {
  event.preventDefault();

  // Process input (adds row, returns data)
  const inputData = await processInput(event);
  if (inputData?.error) {
    console.warn("Input error:", inputData?.error);
    return; // Don't proceed further
  }
  lastInputData = inputData; // Store the last input data

  // Get updated markers array including the new input
  updatedMarkers = updatedMarkers.concat(await markers(inputData));
  //the error is here, "inputData" is not defined
  addressData.push(lastInputData);

  console.log("Updated markers:", updatedMarkers)
  // Reinitialize the globe with new markers
  initGlobe({ coordinateArray: updatedMarkers });

  // Clear inputs and refocus
  const locationInput = document.getElementById("location");
  const amountInput = document.getElementById("amount");

  locationInput.value = '';
  amountInput.value = '';
  locationInput.focus();
}



function handleCalc(event) {
  event.preventDefault();
  console.log("Calculation button clicked");
  if (!lastInputData) {
    alert("Please insert at least one location before calculating.");
    return;
  }
  const OMT = cOMT(lastInputData);
  console.log("OMT:", OMT);
  alert("Optimal meeting time is: " + OMT/60 + ":00 UTC");
  //could alert the time in local time for each person.
  return OMT;
}
// Attach event listener after DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  window.processInput = processInput;
  document.getElementById('insertBtn').addEventListener('click', handleInsert);
  document.getElementById('calcBtn').addEventListener("click", handleCalc);

  // Initialize globe with no markers
  initGlobe({ coordinateArray: [] });
});