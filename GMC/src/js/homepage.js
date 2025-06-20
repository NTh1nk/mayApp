import { processInput } from './processInput.js';
import { initGlobe } from './globe.js';
import { markers } from './placeMarker.js';
//import data from './markers.json';
import { cOMT } from './COMT.js';
import { cOMP } from './COMP.js';
import * as THREE from 'three';
import { getTimeZone } from './tzDB.js';
import { localTimeMarkerInfo } from './markerInfo.js';
import "../css/style.css";
import "../css/index.css";
import { initSlider } from './slider.js';
import { loadChart } from './loadChart.js';
import { handleHQInsert, loadHQ } from './loadHQ.js';
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
    workStart: 540, // Could also get input here
    workEnd: 1260,  // Could also get input here
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
  //convert OMT to hours and minutes
  const OMTStandardized = minutesToStandardTime(OMT);
  alert("Optimal Meeting Time (UTC): " + OMTStandardized);
  OMTBox.value = OMTStandardized + " UTC";
  OMTBox.style.color = "white";
  updatedMarkers = reloadMarkers(updatedMarkers, OMT);
  await handlecOMP();


  return OMT;
}

// Attach event listener after DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  window.processInput = processInput;
  
  document.getElementById('calcBtn').addEventListener("click", handleCalc);

    // Simulate clicking the Insert button or call its function
  document.getElementById("insertBtn").addEventListener("click", handleInsert);

  //handle the click of the HQ button
  loadHQ();

document.getElementById("hqForm").addEventListener("submit", handleHQInsert);
  const form = document.getElementById("dataForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevents default page reload

  });
  initSlider();
  // Initialize globe with no markers
  initGlobe({ coordinateArray: [] });
});


async function handlecOMP(){
  const candidateCities = [
  { name: 'London', lat: 51.5074, lng: -0.1278, amount: 2 },
  { name: 'New York', lat: 40.7128, lng: -74.0060, amount: 2 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, amount: 2 },
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
  inputCity.coords.infoBox = "OMP";

  console.log("Input City: ", inputCity);


  updatedMarkers = updatedMarkers.concat(await markers(inputCity));
  console.log("Updated markers:", updatedMarkers)

    // 2. Create routes from OMP to all addressData points
      // Define ompCoords here
  const ompCoords = {
    lat: inputCity.coords.lat,
    lng: inputCity.coords.lng,
    name: OMP,
  };

  const ompRoutes = addressData.map(addr => ({
    srcAirport: { lat: addr.lat, lng: addr.lng },
    dstAirport: { lat: ompCoords.lat, lng: ompCoords.lng },
    airline: "OMP Route",
    srcIata: "OMP",
    dstIata: addr.name || "User Location",
  }));

  initGlobe({ 
    coordinateArray: updatedMarkers,
    arcArray: ompRoutes
   });

}



function minutesToStandardTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);
  // Pad with leading zeros if needed
  const hh = hours.toString().padStart(2, '0');
  const mm = minutes.toString().padStart(2, '0');
  return `${hh}:${mm}`;
}


function reloadMarkers(markers, OMT) {
  // This function can be used to reload markers, and update their infobox

  if (!markers || !Array.isArray(markers)) {
    console.error("Invalid markers array:", markers);
    return;
  }
  if(!OMT || typeof OMT !== 'number') {
    console.error("Invalid OMT value:", OMT);
    return;
  }
  localTimeMarkerInfo(markers, OMT);

  let updatedMarkers = markers.map(marker => {
    marker.info = `Local Time: ${marker.localTime}`;
    return marker;
  });
  console.log("Updated markers with local time info:", updatedMarkers);
  
  return updatedMarkers
}



function HQ() {
  // HQ button click handler
  console.log("HQ button clicked");
  loadHQ();
}

function hQClick(){
  handleHQInsert();
}