export function loadHQ() {
    const overlay = document.getElementById("hQOverlay");
    const btn = document.getElementById("openHQBtn");
      
    const closeBtn = overlay.querySelector(".close");

    btn.addEventListener("click", () => {
        const isActive = overlay.classList.contains("active");
        overlay.classList.toggle("active");

        // Toggle button text
        //btn.textContent = isActive ? "Add HQ" : "Close HQ";
    });

    closeBtn.addEventListener("click", () => {
        overlay.style.display = "none";
    });

}
