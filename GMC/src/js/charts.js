
const btn = document.getElementById("openCanvasBtn");
const overlay = document.getElementById("canvasOverlay");
const reload = document.getElementById("reloadBtn");
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

function loadChart() {
  
  const canvas = document.getElementById("flawChart");
  const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

  const xValues = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', 
  '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

  let yValues = [

  ]

  //loop through the xValues and get the localStorage values for each hour
  for (let i = 0; i < xValues.length; i++) {
      //const hour = i.toString().padStart(2, '0') + ":00";
      //const storedValue = localStorage.getItem(hour) || 0;
      yValues.push(localStorage.getItem(i*60 + "time") || 0);
  }

  const maxFlaw = Math.max(...yValues);
  console.log("Max flaw:", maxFlaw);

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
      legend: {
        display: false,
        labels: {
          fontColor: 'white' // legend label color if legend is ever enabled
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
            max: maxFlaw,
            fontColor: 'white' // Y-axis label color
          },
          gridLines: {
            color: 'rgba(255, 255, 255, 0.1)' // optional: faint grid lines
          }
        }],
        xAxes: [{
          ticks: {
            fontColor: 'white' // X-axis label color
          },
          gridLines: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }]
      },
      tooltips: {
        bodyFontColor: 'white',
        titleFontColor: 'white',
        backgroundColor: '#333'
      }
    }
  });
}
function reloadPage() {
    // Clear localStorage
    localStorage.clear();
    // Reload the page
    window.location.reload();
    loadChart(); 
}


loadChart();
reload.addEventListener("click", reloadPage);