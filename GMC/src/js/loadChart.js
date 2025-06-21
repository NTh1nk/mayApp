
export function loadChart() {
  const overlay = document.getElementById("canvasOverlay");
  const canvas = document.getElementById("flawChart");
  const ctx = canvas.getContext("2d");
  if(window.myChart)  {
    window.myChart.destroy();
    console.log("Chart destroyed");
  }

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
      yValues.push(localStorage.getItem(i + "time") || 0);
  }

  const maxFlaw = Math.max(...yValues);
  console.log("Max flaw:", maxFlaw);

  window.myChart = new Chart("flawChart", {
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
            max: maxFlaw * 1.2, // 20% more than max flaw
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


export function loadHQChart() {
  const hqList = JSON.parse(localStorage.getItem('hqList')) || [];
  const ctx = document.getElementById('hqGraph').getContext('2d');
  const labels = hqList.map(hq => hq.address);
  let data = []; 

  for (let i = 0; i < hqList.length; i++) {
    const storedValue = localStorage.getItem(`hQ_${i}`) || 0;
    data.push(storedValue);
  }

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'HQs',
        data: data,
        backgroundColor: 'rgba(30, 144, 255, 0.7)'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}