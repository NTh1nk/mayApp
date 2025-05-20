export async function processInput(event) {
    if (event) event.preventDefault();

    const location = document.getElementById("location").value;
    const amount = parseFloat(document.getElementById("amount").value);
    
    if (!location || isNaN(amount)) {
        alert("Please enter a valid location and amount.");
        return null;   // Explicitly return null instead of undefined
    }

    console.log("Location:", location);
    console.log("Amount:", amount);

    const tableBody = document.querySelector("#peopleTable tbody");

    const newRow = document.createElement("tr");
    const addressCell = document.createElement("td");
    const amountCell = document.createElement("td");

    let coords = await geocodeAddress(location);

    if (!coords) {
        alert("Failed to get coordinates for " + location);
        return null;
    }

    addressCell.textContent = location;
    amountCell.textContent = amount;

    newRow.appendChild(addressCell);
    newRow.appendChild(amountCell);
    tableBody.appendChild(newRow);

    document.getElementById("location").value = '';
    document.getElementById("amount").value = '';

    return { address: location, amount, coords };
}
