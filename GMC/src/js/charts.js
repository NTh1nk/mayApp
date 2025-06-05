export function flawChart() { 
    const xValues = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00'];
    const yValues = [65, 59, 80, 81, 56, 55, 40];

    new Chart("myChart", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
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

}   