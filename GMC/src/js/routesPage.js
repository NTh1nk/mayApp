import { processInput } from './processInput.js';
import { initGlobe } from './routesGlobe.js';
import { markers } from './placeMarker.js';
//import data from './markers.json';
import { cOMT } from './COMT.js';
import { cOMP } from './COMP.js';
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
  await handlecOMP();
  return OMT;
}
// Attach event listener after DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  window.processInput = processInput;
  
  document.getElementById('calcBtn').addEventListener("click", handleCalc);

    // Simulate clicking the Insert button or call its function
  document.getElementById("insertBtn").addEventListener("click", handleInsert);

  const form = document.getElementById("dataForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevents default page reload

  });
  // Initialize globe with no markers
  initGlobe({ coordinateArray: [] });
});


async function handlecOMP(){
  const candidateCities = [
  { name: 'London', lat: 51.5074, lng: -0.1278, amount: 15 },
  { name: 'New York', lat: 40.7128, lng: -74.0060, amount: 15 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, amount: 15 },
  // Add more capitals here
  ];
  const OMPBox = document.getElementById("ompResult");
  const OMP = cOMP(candidateCities, addressData);
  OMPBox.value = OMP;
  OMPBox.style.color = "white";

  
  const inputCity = await processInput({ address: OMP });

  if (inputCity?.error) {
    console.warn("Input error:", inputCity?.error);
    return;
  }
    /*addressData.push({
    ...inputCity.coords,

  });*/

  //add a custon infobox
  inputCity.coords.infoBox = "Optimal Meeting Point";

  console.log("Input City: ", inputCity);


  updatedMarkers = updatedMarkers.concat(await markers(inputCity));
  console.log("Updated markers:", updatedMarkers)
  initGlobe({ coordinateArray: updatedMarkers });

}

