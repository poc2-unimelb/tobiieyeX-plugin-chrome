$(document).ready(function(){

var gazeText = localStorage.getItem("gazeTextList");
var gazeTextList = JSON.parse(gazeText);

var topText = [];
var topTextValue = [];
for (var key in gazeTextList){
    topText.push(key);
    topTextValue.push(gazeTextList[key]);
}

var clickAction = localStorage.getItem("clickActionList");
var clickActionList = JSON.parse(clickAction);

for (var key in clickActionList){
    $('#'+key).attr('data-to', clickActionList[key]);
}

var data = {
        labels: topText,
        datasets: [{
            label: '# of gaze on Text',
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
                text: 'Gaze portion on Text'
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
var gazeTextTime = localStorage.getItem("gazeTextTime");
var gazeTextTimeList = JSON.parse(gazeTextTime);

var gazeButtonTime = localStorage.getItem("gazeButtonTime");
var gazeButtonTimeList = JSON.parse(gazeButtonTime);


var tag = {};
for(var key in gazeTextTimeList)
    tag[key]=1;

for(var key in gazeButtonTimeList)
    tag[key]=1;

var sortedTime = [];
for(var key in tag) {
    sortedTime[sortedTime.length] = key;
}
sortedTime.sort();


timeTag = [];
textTag = [];
buttonTag = [];
totalTag = [];


for(var i in sortedTime){
    key  = sortedTime[i]
    timeTag.push(key);

    if(gazeTextTimeList[key])
        textTag.push(gazeTextTimeList[key]);
    else
        textTag.push(0);

    if(gazeButtonTimeList[key])
        buttonTag.push(gazeButtonTimeList[key]);
    else
        buttonTag.push(0);

    totalTag.push(buttonTag[buttonTag.length-1] + textTag[textTag.length-1]);
}


    var timeFormat = 'MM/DD/YYYY HH:mm:ss';
    var config = {
      type: 'bar',
      data: {
        labels: timeTag,
        datasets: [{
          type: 'bar',
          label: 'Text gaze times',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          data: textTag,
        }, {
          type: 'bar',
          label: 'Button gaze times',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          data: buttonTag,
        },{
          type: 'line',
          label: 'Total gaze times',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
          data: totalTag,
        }
        ]
      },
      options: {
                title: {
                    text:"Time series analysis "
                },
        scales: {
          xAxes: [{
            type: "time",
            display: true,
            time: {
              format: timeFormat
            }
          }],
        },
      }
    };
    var ctx = document.getElementById("timeline").getContext("2d");
    window.myLine = new Chart(ctx, config);

});

