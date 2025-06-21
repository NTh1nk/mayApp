
import { geocodeAddress } from "./geocodeAddress.js";


//update it so it gets all the markers
//
//going to add the output as a json.


export async function processInput(eventOrData) {
    //This is because, the button is formatted weird, could fix later on ÆÆ
    if (eventOrData && typeof eventOrData.preventDefault == "function") {
        eventOrData.preventDefault();
    
        const location = document.getElementById("location").value;
        const amount = parseFloat(document.getElementById("amount").value);
        if (!location || isNaN(amount)) {
            alert("Please enter a valid location and amount.");
            return { error: "Invalid input" };
        }
        console.log("Location:", location);
        console.log("Amount:", amount);
        //alert(location);  //Just for debugging

        //Insert the input into the table
        const tableBody = document.querySelector("#peopleTable tbody");

        const newRow = document.createElement("tr");
        const addressCell = document.createElement("td");
        const amountCell = document.createElement("td")
        const deleteCell = document.createElement("td");
        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-location-btn";

        deleteBtn.addEventListener("click", () => {
            newRow.remove();
        });

        let coords = await geocodeAddress(location);

        if (!coords) {
            alert("Failed to get coordinates for " + location);
            return { error: "Failed to get coordinates" };
        }
        
    
        //Place marker


        addressCell.textContent = location;
        amountCell.textContent = amount;

        newRow.appendChild(addressCell);
        newRow.appendChild(amountCell);
        
        deleteCell.appendChild(deleteBtn);
        newRow.appendChild(deleteCell);

        tableBody.appendChild(newRow);
            
    
        document.getElementById("location").value = '';
        document.getElementById("amount").value = '';
        console.log(location, amount, coords);
        return { address: location, amount, coords};
    } else if (eventOrData && typeof eventOrData === "object") {
        // eventOrData is a data object (e.g. OMP)
        const data = eventOrData;

        // If data already has coords, just return it
        if (data.coords) {
        return data;
        }

        // If it has address but no coords, try to geocode
        if (data.address) {
        const coords = await geocodeAddress(data.address);
        if (!coords) {
            return { error: "Failed to get coordinates" };
        }
        return { ...data, coords };
        }

        return { error: "Invalid data input" };

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