import { processInput, renderPeopleTable } from './processInput.js';
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
import { loadChart, loadHQChart } from './loadChart.js';
import { handleHQInsert, loadHQ } from './loadHQ.js';
import { geocodeAddress } from './geocodeAddress.js';
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
  const personObj = {
    ...inputData.coords,
    workStart: 540,
    workEnd: 1260,
    timezone,
    // add other fields as needed
  };
  addressData.push(personObj);

    // --- Save to localStorage ---
  let peopleList = JSON.parse(localStorage.getItem('peopleList')) || [];
  peopleList.push(personObj);
  localStorage.setItem('peopleList', JSON.stringify(peopleList));
  // ----------------------------


  updatedMarkers = updatedMarkers.concat(await markers(inputData));
  console.log("Updated markers:", updatedMarkers)
  console.log("Markers for globe:", updatedMarkers);
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
window.addEventListener('DOMContentLoaded', async () => {
  window.processInput = processInput;
  
  document.getElementById('calcBtn').addEventListener("click", handleCalc);

  //call the handleOpenMobile to open the mobile menu
  document.getElementById('openMobileMenuBtn').addEventListener("click", handleOpenMobile);


    // Simulate clicking the Insert button or call its function
  document.getElementById("insertBtn").addEventListener("click", handleInsert);

  document.getElementById("openHQGraphBtn").addEventListener("click", handleHQChartClick);
    const openHQGraphBtn = document.getElementById('openHQGraphBtn');
  const hqGraphContainer = document.getElementById('hqGraphContainer');

  openHQGraphBtn.addEventListener('click', () => {
    // Toggle visibility
    if (hqGraphContainer.style.display === 'none' || hqGraphContainer.style.display === '') {
      hqGraphContainer.style.display = 'block';
      loadHQChart(); // Draw the chart when shown
    } else {
      hqGraphContainer.style.display = 'none';
    }
  });
  //handle the click of the HQ button
  loadHQ();
  await renderPeopleTable();
  //reload the markers
  console.log("Reloading markers with initial data", updatedMarkers);
  initGlobe({ coordinateArray: updatedMarkers });

document.getElementById("hqForm").addEventListener("submit", handleHQInsert);
  const form = document.getElementById("dataForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevents default page reload

  });
  initSlider();
   // --- LOAD PEOPLE FROM LOCALSTORAGE AND INIT GLOBE ---
  let peopleList = JSON.parse(localStorage.getItem('peopleList')) || [];
  addressData = [];
  let rawMarkers = [];
  for (const person of peopleList) {
    let lat, lng;
    if (person.coords && typeof person.coords.lat === "number" && typeof person.coords.lng === "number") {
      lat = person.coords.lat;
      lng = person.coords.lng;
    } else if (typeof person.lat === "number" && typeof person.lng === "number") {
      lat = person.lat;
      lng = person.lng;
    }
    let amount = (typeof person.amount === "number" && !isNaN(person.amount)) ? person.amount : 1;

    if (typeof lat === "number" && typeof lng === "number") {
      addressData.push({
        lat,
        lng,
        amount,
        workStart: person.workStart || 540,
        workEnd: person.workEnd || 1260,
        timezone: person.timezone || "",
        ...(person.coords || {})
      });
      rawMarkers.push({
        coords: { lat, lng },
        workStart: person.workStart || 540,
        workEnd: person.workEnd || 1260,
        name: person.address || person.name || "",
        amount
      });
    }
  }

  // --- NEW: Process markers through your markers() function ---
  // This ensures all marker objects have the correct texture and properties
  let processedMarkers = [];
  for (const marker of rawMarkers) {
    // markers() may be async and may return an array, so await and flatten
    const result = await markers(marker);
    if (Array.isArray(result)) {
      processedMarkers = processedMarkers.concat(result);
    } else if (result) {
      processedMarkers.push(result);
    }
  }

  // Get current UTC minutes
  const now = new Date();
  const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();

  updatedMarkers = reloadMarkers(processedMarkers, utcMinutes);
  initGlobe({ coordinateArray: updatedMarkers });
});


async function handlecOMP() {
  // 1. Load HQs from localStorage
  let candidateCities = [];
  const hqList = JSON.parse(localStorage.getItem('hqList')) || [];
  // Each HQ should have at least address, timezone, and ideally lat/lng
  // If you have lat/lng saved, use them; otherwise, you may need to geocode here
  candidateCities = hqList
    .filter(hq => hq.lat && hq.lng) // Only use HQs with coordinates
    .map(hq => ({
      name: hq.address,
      lat: hq.lat,
      lng: hq.lng,
      amount: 2 // or use hq.amount if you store it
    }));

  // If you don't have lat/lng in localStorage, you need to geocode each HQ here (async)
  // Example (if needed):
  for (const hq of hqList) {
    if (!hq.lat || !hq.lng) {
      const geo = await geocodeAddress(hq.address);
      candidateCities.push({ name: hq.address, lat: geo.lat, lng: geo.lng, amount: 2 });
    }
  }

  if (candidateCities.length === 0) {
    console.log("No HQs with coordinates found in localStorage.");
    return;
  }

  const OMPBox = document.getElementById("ompResult");
  console.log(candidateCities, addressData);
  const OMP = cOMP(candidateCities, addressData);
  if (!OMP) {
    console.error("cOMP returned undefined. candidateCities:", candidateCities, "addressData:", addressData);
    return;
  }
  OMPBox.value = OMP;
  OMPBox.style.color = "white";

  console.log("calling processinput with ", OMP);

  //currently OMP is just a string of the city name which is why i am getting an error here
  const inputCity = await processInput({ address: OMP });
  console.log("Result from processInput for OMP:", inputCity);
  if (inputCity?.error || !inputCity) {
    console.warn("Input error:", inputCity?.error);
    return;
  }

  // Ensure inputCity has coords and name
  if (!inputCity.coords || !inputCity.coords.lat || !inputCity.coords.lng) {
    console.error("Invalid inputCity coordinates:", inputCity);
    return;
  }
  else {
    inputCity.coords.infoBox = "OMP";
    console.log("Input City: ", inputCity);
  }
  updatedMarkers = updatedMarkers.concat(await markers(inputCity));
  console.log("Updated markers:", updatedMarkers);

  // 2. Create routes from OMP to all addressData points
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


export async function reloadDelete() {
  // 1. Reload people from localStorage
  let peopleList = JSON.parse(localStorage.getItem('peopleList')) || [];
  addressData = [];
  let rawMarkers = [];
  for (const person of peopleList) {
    let lat, lng;
    if (person.coords && typeof person.coords.lat === "number" && typeof person.coords.lng === "number") {
      lat = person.coords.lat;
      lng = person.coords.lng;
    } else if (typeof person.lat === "number" && typeof person.lng === "number") {
      lat = person.lat;
      lng = person.lng;
    }
    let amount = (typeof person.amount === "number" && !isNaN(person.amount)) ? person.amount : 1;

    if (typeof lat === "number" && typeof lng === "number") {
      addressData.push({
        lat,
        lng,
        amount,
        workStart: person.workStart || 540,
        workEnd: person.workEnd || 1260,
        timezone: person.timezone || "",
        ...(person.coords || {})
      });
      rawMarkers.push({
        coords: { lat, lng },
        workStart: person.workStart || 540,
        workEnd: person.workEnd || 1260,
        name: person.address || person.name || "",
        amount
      });
    }
  }

  // 2. Process markers through your markers() function
  let processedMarkers = [];
  for (const marker of rawMarkers) {
    const result = await markers(marker);
    if (Array.isArray(result)) {
      processedMarkers = processedMarkers.concat(result);
    } else if (result) {
      processedMarkers.push(result);
    }
  }

  // 3. Get current UTC minutes
  const now = new Date();
  const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();

  // 4. Update and reload globe
  updatedMarkers = reloadMarkers(processedMarkers, utcMinutes);
  initGlobe({ coordinateArray: updatedMarkers });
}

function HQ() {
  // HQ button click handler
  console.log("HQ button clicked");
  loadHQ();
}

function hQClick(){
  handleHQInsert();
}


function handleHQChartClick() {
  // Handle HQ chart click
  console.log("HQ chart clicked");
  loadHQChart();
}

function handleOpenMobile(e){
  e?.stopPropagation?.(); // Prevent event bubbling if called from a click
  const sidebar = document.querySelector('.sidebar');
  const btn = document.getElementById('openMobileMenuBtn');
  if (sidebar.classList.contains('active')) {
    sidebar.classList.remove('active');
    if (btn) btn.textContent = "+";
  } else {
    sidebar.classList.add('active');
    if (btn) btn.textContent = "−";
  }
}