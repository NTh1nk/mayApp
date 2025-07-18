import { processInput } from './processInput.js';
import { initGlobe } from './globe.js';
import { markers } from './placeMarker.js';
//import data from './markers.json';
import { cOMT } from './COMT.js';
import * as THREE from 'three';
import { getTimeZone } from './tzDB.js';
import "../css/style.css";
import "../css/index.css";
//console.log(data);
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
  const timezone = await getTimeZone(inputData.coords.lat, inputData.coords.lng);
  lastInputData = inputData;

  // Merge coords into the object for COMT
  console.log("Input data:", inputData);
  addressData.push({
    ...inputData.coords,
    workStart: 480, // Could also get input here
    workEnd: 1200,  // Could also get input here
    timezone,       // Add timezone to address data
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

  const OMTBox = document.getElementById("omtResult");
  const OMT = await cOMT(addressData);
  console.log("Optimal Meeting Time (UTC):", OMT);
  alert("Optimal Meeting Time (UTC): " + OMT/60 + ":00");
  OMTBox.value = OMT/60 + ":00 UTC";
  OMTBox.style.color = "white";
  return OMT;
}
// Attach event listener after DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  window.processInput = processInput;
  
  document.getElementById('calcBtn').addEventListener("click", handleCalc);


  const form = document.getElementById("dataForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevents default page reload

    // Simulate clicking the Insert button or call its function
    document.getElementById("insertBtn").addEventListener("click", handleInsert);
  });
  // Initialize globe with no markers
  initGlobe({ coordinateArray: [] });
});