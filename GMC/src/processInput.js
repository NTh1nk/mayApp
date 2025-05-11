export function processInput(event) {
    if (event) event.preventDefault();

    const location = document.getElementById("location").value;
    const amount = parseFloat(document.getElementById("amount").value);

    console.log("Location:", location);
    console.log("Amount:", amount);

    // Reset input fields
    document.getElementById("location").value = '';
    document.getElementById("amount").value = '';

    return { address: location, amount };
}
