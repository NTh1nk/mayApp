export function loadHQ() {
    const overlay = document.getElementById("hQOverlay");
    const btn = document.getElementById("openHQBtn");
    btn.addEventListener("click", () => {
        const isActive = overlay.classList.contains("active");
        overlay.classList.toggle("active");

        // Toggle button text
        btn.textContent = isActive ? "Add HQ" : "Close HQ";
    });

}
