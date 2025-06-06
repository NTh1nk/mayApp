
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

const xValues = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00',
                 '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
                 '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
                 '19:00', '20:00', '21:00', '22:00', '23:00'];
const yValues = [65, 59, 80, 81, 56, 55, 40, 55, 60, 70, 75, 80, 85, 90, 95, 100, 95, 90, 85, 80, 75, 70, 65, 60];


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