import { geocodeAddress } from "./geocodeAddress";

export async function processInput(event) {
      if (event) event.preventDefault();
        const location = document.getElementById("location").value;
        const amount = document.getElementById("amount").value;
        console.log("Location:", location);
        console.log("Amount:", amount);
            //  Display it
        alert(`Location: ${location}\nAmount: ${amount}`); 
     

        const address = document.getElementById("location").value;
        const amountFloat = parseFloat(document.getElementById("amount").value);
        
        const coordinates = await geocodeAddress(address);
        //Reset input fields:
        document.getElementById("location").value = '';
        document.getElementById("amount").value = '';

      }
    