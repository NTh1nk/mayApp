export function loadHQ() {
  const overlay = document.getElementById("hQOverlay");
  const btn = document.getElementById("openHQBtn");
  const closeBtn = overlay.querySelector(".close");

  btn.addEventListener("click", () => {
    overlay.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
  });
}

export function handleHQInsert(event) {
  event.preventDefault();
  
  const hqInput = document.getElementById("hqInput");
  const hqValue = hqInput.value.trim();

  if (!hqValue) {
    alert("Please enter a valid HQ location.");
    return;
  }

  // Process the HQ input (e.g., geocode it, add to markers)
  
  // Clear the input field
  hqInput.value = '';
}