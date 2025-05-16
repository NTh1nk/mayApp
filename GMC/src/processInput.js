//there is currently a bug, 16-05-2025, it doesnt insert into the table
//could be from here...

import { geocodeAddress } from "./geocodeAddress";


export function processInput(event) {
    //This is because, the button is formatted weird, could fix later on ÆÆ
    if (event) event.preventDefault();

    const location = document.getElementById("location").value;
    const amount = parseFloat(document.getElementById("amount").value);
    if (!location || isNaN(amount)) {
        alert("Please enter a valid location and amount.");
        return;
    }
    console.log("Location:", location);
    console.log("Amount:", amount);

    //alert(location);  //Just for debugging

    //Insert the input into the table
    const tableBody = document.querySelector("#peopleTable tbody");

    const newRow = document.createElement("tr");
    const addressCell = document.createElement("td");
    const amountCell = document.createElement("td")


    //let coords = geocodeAddress(address);
    
    //Place marker


    addressCell.textContent = location;
    amountCell.textContent = amount;

    newRow.appendChild(addressCell);
    newRow.appendChild(amountCell);
    
    tableBody.appendChild(newRow);
        
    // Reset input fields
    /*
    document.getElementById("location").value = '';
    document.getElementById("amount").value = '';
    */
    return { address: location, amount};
    //return { address: location, amount, coords };

}
