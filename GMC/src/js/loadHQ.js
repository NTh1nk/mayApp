import { geocodeAddress } from './geocodeAddress.js'; // adjust path as needed
import { introHQ } from './intro/introHomepage.js';

export function loadHQ() {
  const overlay = document.getElementById("hQOverlay");
  const btn = document.getElementById("openHQBtn");
  const closeBtn = overlay.querySelector(".close");

  btn.addEventListener("click", () => {
    overlay.classList.add("active");
    introHQ();

  });

  closeBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
  });
  loadHQTableFromStorage();

}

export async function handleHQInsert(event) {
  event.preventDefault();

  const hqInput = document.getElementById("hQLocation");
  const hqValue = hqInput.value.trim();

  if (!hqValue) {
    alert("Please enter a valid HQ location.");
    return;
  }

  // Call geocode function to get timezone (and optionally lat/lng)
  let timezone = "—";
  try {
    const geoResult = await geocodeAddress(hqValue); // your async geocode function
    timezone = geoResult.timezone || "—";
  } catch (err) {
    alert("Could not determine timezone for this location.");
  }

  // 1. Get current HQs from localStorage or start with empty array
  let hqList = JSON.parse(localStorage.getItem('hqList')) || [];

  // 2. Add the new HQ with timezone
  hqList.push({ address: hqValue, timezone });

  // 3. Save back to localStorage
  localStorage.setItem('hqList', JSON.stringify(hqList));
  console.log("HQ List updated:", hqList);
  // 4. Refresh the table
  loadHQTableFromStorage();

  hqInput.value = '';
}

export function loadHQTableFromStorage() {
  const hqTableBody = document.getElementById("hQTable").querySelector("tbody");
  hqTableBody.innerHTML = ""; // Clear existing rows

  const hqList = JSON.parse(localStorage.getItem('hqList')) || [];
  hqList.forEach((hq, idx) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${hq.address}</td>
      <td>${hq.timezone}</td>
      <td>
        <button class="delete-hq-btn" data-idx="${idx}" style="color:red;">Delete</button>
      </td>
    `;
    hqTableBody.appendChild(row);
  });

  // Add event listeners for delete buttons
  hqTableBody.querySelectorAll('.delete-hq-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = parseInt(this.getAttribute('data-idx'));
      let hqList = JSON.parse(localStorage.getItem('hqList')) || [];
      hqList.splice(idx, 1); // Remove the HQ at this index
      localStorage.setItem('hqList', JSON.stringify(hqList));
      loadHQTableFromStorage(); // Refresh the table
    });
  });
}