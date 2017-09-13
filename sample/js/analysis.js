$(document).ready(function(){

var gazeText = localStorage.getItem("gazeTextList");
var gazeTextList = JSON.parse(gazeText);

var topText = [];
var topTextValue = [];
for (var key in gazeTextList){
    topText.push(key);
    topTextValue.push(gazeTextList[key]);
}

var data = {
        labels: topText,
        datasets: [{
            label: '# of gaze',
            data: topTextValue,
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1
        }]
    };
var  options= {
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]
        }
    };
var PolarOptions= {
            responsive: true,
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Gaze portion'
            },
            scale: {
              ticks: {
                beginAtZero: true
              },
              reverse: false
            },
            animation: {
                animateRotate: false,
                animateScale: true
            }
        };
var hbar_obj = document.getElementById("horizontalBar_object").getContext('2d');
var Polar_object = document.getElementById("Polar_object").getContext('2d');

new Chart(hbar_obj, {
    type: 'horizontalBar',
    data: data,
    options: options
});
new Chart(Polar_object, {
    data: data,
    type: 'polarArea',
    options: PolarOptions
});

});

