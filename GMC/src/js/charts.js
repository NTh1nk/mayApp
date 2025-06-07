
const btn = document.getElementById("openCanvasBtn");
const overlay = document.getElementById("canvasOverlay");

btn.addEventListener("click", () => {
    const isActive = overlay.classList.contains("active");
    overlay.classList.toggle("active");

    // Toggle button text
    btn.textContent = isActive ? "+" : "–";
});

  // Optional: also allow closing by clicking the overlay
overlay.addEventListener("click", () => {
    overlay.classList.remove("active");
    btn.textContent = "+";
});
const canvas = document.getElementById("flawChart");
const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

const xValues = ['00:00', '01:00'];
const yValues = [
  localStorage.getItem("flaw0") || 0,
  localStorage.getItem("flaw1") || 0,
]


new Chart("flawChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,200,255,0.1)",
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 0, max:100}}],
    }
  }
}); 