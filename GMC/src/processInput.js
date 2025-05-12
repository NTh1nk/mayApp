export function processInput(event) {
    if (event) event.preventDefault();

    const location = document.getElementById("location").value;
    const amount = parseFloat(document.getElementById("amount").value);

    console.log("Location:", location);
    console.log("Amount:", amount);

    alert(location);  //Just for debugging
    // Reset input fields

    //Insert the input into the table
    const table = document.getElementById("peopleTable");

    const newRow = document.createElement("tr");
    const addressCell = document.createElement("td");
    const amountCell = document.createElement("td")


    addressCell.textContent = location;
    amountCell.textContent = amount;

    newRow.appendChild(addressCell);
    newRow.appendChild(amountCell);
    
    table.appendChild(newRow);

    document.getElementById("location").value = '';
    document.getElementById("amount").value = '';

    return { address: location, amount };
}
