import './style.css';
import { processInput } from './processInput.js';
import { initGlobe } from './globe.js';
import { generateMarkers } from './markers.js';

async function handleInsert(event) {
    event.preventDefault();

    const inputData = await processInput();
    if (!inputData) return;

    const { address, amount, coords } = inputData;

    // Insert into the table
    const tableBody = document.querySelector("#peopleTable tbody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `<td>${address}</td><td>${amount}</td>`;
    tableBody.appendChild(newRow);

    // Generate markers and re-render globe
    const allMarkers = generateMarkers({ amount, coords });
    initGlobe({ coordinateArray: allMarkers });

    // Clear form inputs
    document.getElementById("location").value = '';
    document.getElementById("amount").value = '';
    document.getElementById("location").focus();
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('insertBtn').addEventListener('click', handleInsert);
    initGlobe({ coordinateArray: [] });
});
