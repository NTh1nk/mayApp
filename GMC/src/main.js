import './style.css';
import { processInput } from './processInput.js';
import { initGlobe } from './globe.js';
import { markers } from './placeMarker.js';
import data from "./json/markers.json";
import { cOMT } from './COMT.js';
import { add } from 'three/tsl';

console.log(data);
//let updatedMarkers = [...data];
let updatedMarkers = [];
let addressData = [];
let lastInputData = null;

async function handleInsert(event) {
  event.preventDefault();

  const inputData = await processInput(event);
  if (inputData?.error) {
    console.warn("Input error:", inputData?.error);
    return;
  }
  lastInputData = inputData;

  // Merge coords into the object for COMT
  console.log("Input data:", inputData);
  addressData.push({
    ...inputData.coords,
    workStart: 480, // Could also get input here
    workEnd: 1200,  // Could also get input here
    // add other fields as needed
  });

  updatedMarkers = updatedMarkers.concat(await markers(inputData));
  console.log("Updated markers:", updatedMarkers)
  initGlobe({ coordinateArray: updatedMarkers });

  // Clear inputs and refocus
  const locationInput = document.getElementById("location");
  const amountInput = document.getElementById("amount");

  locationInput.value = '';
  amountInput.value = '';
  locationInput.focus();
}

async function handleCalc(event) {
  event.preventDefault();
  console.log("Calculation button clicked");
  if (addressData.length === 0) {
    alert("Please insert at least one location before calculating.");
    return;
  }

  const OMT = await cOMT(addressData);
  console.log("Optimal Meeting Time (UTC):", OMT);
  console.log("Optimal Meeting Time (Local):", getLocalTime(OMT));
  alert("Optimal meeting time is: " + OMT/60 + ":00 UTC");
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