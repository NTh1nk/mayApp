import { introChart } from "./intro/introHomepage.js";
import { loadChart } from "./loadChart.js";


const overlay = document.getElementById("canvasOverlay");
const btn = document.getElementById("openCanvasBtn");
//const reload = document.getElementById("reloadBtn");
btn.addEventListener("click", () => {
    loadChart();
    const isActive = overlay.classList.contains("active");
    overlay.classList.toggle("active");

    // Toggle button text
    
    btn.textContent = isActive ? "+" : "–";
    setTimeout(() => {
        introChart();
    }, 500);
});

  // Optional: also allow closing by clicking the overlay
overlay.addEventListener("click", () => {
    overlay.classList.remove("active");
    btn.textContent = "+";
});

function reloadPage() {
    // Clear localStorage
    localStorage.clear();
    // Reload the page
    window.location.reload();
    loadChart(); 
}


loadChart();
//reload.addEventListener("click", reloadPage);