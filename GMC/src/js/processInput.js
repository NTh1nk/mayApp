import { geocodeAddress } from "./geocodeAddress.js";

// Renders the people table from localStorage
export function renderPeopleTable() {
    const tableBody = document.querySelector("#peopleTable tbody");
    tableBody.innerHTML = ""; // Clear table

    let peopleList = JSON.parse(localStorage.getItem('peopleList')) || [];
    for (const person of peopleList) {
        const newRow = document.createElement("tr");
        const addressCell = document.createElement("td");
        const amountCell = document.createElement("td");
        const deleteCell = document.createElement("td");
        const deleteBtn = document.createElement("button"); 

        addressCell.textContent = person.address || person.location || '';
        amountCell.textContent = person.amount || '';

        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-location-btn";
        deleteBtn.addEventListener("click", () => {
            // Remove from localStorage
            let updatedList = JSON.parse(localStorage.getItem('peopleList')) || [];
            updatedList = updatedList.filter(p =>
                !(String(p.address) === String(person.address) && Number(p.amount) === Number(person.amount))
            );
            localStorage.setItem('peopleList', JSON.stringify(updatedList));
            console.log("Deleted person:", person.address, person.amount);
            // Remove from table
            renderPeopleTable();
        });
s
        deleteCell.appendChild(deleteBtn);
        newRow.appendChild(addressCell);
        newRow.appendChild(amountCell);
        newRow.appendChild(deleteCell);
        tableBody.appendChild(newRow);
    }
}

// Handles new input and saves to localStorage
export async function processInput(eventOrData) {
    if (eventOrData && typeof eventOrData.preventDefault == "function") {
        eventOrData.preventDefault();

        const location = document.getElementById("location").value;
        const amount = parseFloat(document.getElementById("amount").value);
        if (!location || isNaN(amount)) {
            alert("Please enter a valid location and amount.");
            return { error: "Invalid input" };
        }

        let coords = await geocodeAddress(location);
        if (!coords) {
            alert("Failed to get coordinates for " + location);
            return { error: "Failed to get coordinates" };
        }

        // Save to localStorage
        let peopleList = JSON.parse(localStorage.getItem('peopleList')) || [];
        peopleList.push({ address: location, amount, coords });
        localStorage.setItem('peopleList', JSON.stringify(peopleList));

        // Re-render table
        renderPeopleTable();

        // Clear inputs
        document.getElementById("location").value = '';
        document.getElementById("amount").value = '';
        return { address: location, amount, coords };
    } else if (eventOrData && typeof eventOrData === "object") {
        let coords = await geocodeAddress(eventOrData.address);
        if (!coords) {
            alert("Failed to get coordinates for " + eventOrData.address);
            return { error: "Failed to get coordinates" };
        }
        return { coords };
    } else {
        return { error: "No input provided" };
    }
}

export async function processHQ(HQData) {
    // This function processes HQ data, which is expected to be an object with address and timezone
    if (!HQData || !HQData.address) {
        console.warn("Invalid HQ data:", HQData);
        return { error: "Invalid HQ data" };
    }

    // Geocode the HQ address to get coordinates
    const coords = await geocodeAddress(HQData.address);
    if (!coords) {
        console.warn("Failed to get coordinates for HQ:", HQData.address);
        return { error: "Failed to get coordinates" };
    }

    // Return the processed HQ data with coordinates
    return { ...HQData, coords };
}