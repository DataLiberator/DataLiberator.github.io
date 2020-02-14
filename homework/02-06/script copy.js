var width = window.innerWidth;
var height = window.innerHeight;

var margin = {top: 20, right: 75, bottom: 50, left: 75};
var chartWidth = width - margin.left - margin.right;
var chartHeight = height - margin.top - margin.bottom;

var svg = d3.select("#chart")
.attr("width", width)
.attr("height", height);

//NASA Astroid API, found on this website:https://api.nasa.gov/
var realtimeURL = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=1993-07-31&end_date=1993-07-31&api_key=LBPa28DapgpXxWTBLaKb5fw8gCMzk7PCzt2cUaXv'; //currently the hard-coded date of my birthday. Will make it adjustable to different birthdays.
var data = [];
var birthday = '1993-07-31'; //Later: will make this variable change to be the date was last entered


// var barWidth = chartWidth / dataMax;

var domainValues = d3.range(1, 24)

var x = d3.scaleBand()
    .domain(domainValues)
    .range([margin.left, margin.left + chartWidth]);

var barWidth = x.bandwidth();

function onButtonPress() {
    //get the date from the dropdown
        var x = document.getElementById("frm1");
        var text = "";
        var i;
        for (i = 0; i < x.length ;i++) {
          text += x.elements[i].value + "<br>";
        }
        document.getElementById("demo").innerHTML = text;
      }
    //create the url
    //call fetchdata


function fetchData() {

    d3.json(realtimeURL, function (error, data) {
        
        // filling + printing dataArray
        var dataArray = []

        for (i = 0; i < data.near_earth_objects["1993-07-31"].length; i++) {
            var asteroid = data.near_earth_objects["1993-07-31"][i]

            var scaledTimeArray = asteroid["close_approach_data"][0]["close_approach_date_full"].split(" ")[1].split(":");
            var scaledTime = (scaledTimeArray[0]) + (scaledTimeArray[1])/60

            var asteroidObject = {
                date: asteroid["close_approach_data"][0]["close_approach_date_full"],
                time: scaledTime,
                maxDiameter: asteroid["estimated_diameter"]["feet"]["estimated_diameter_max"],
                hazardous: asteroid["is_potentially_hazardous_asteroid"]
            }
            dataArray.push(asteroidObject);
        };

        console.log(dataArray);
        
        // //X-Axis
        var x = d3.time.scale()
            .domain(d3.extent(data, function(d) { return d.time; }))
            .nice(d3.time.day, 1)
            .rangeRound([0, width - margin.left - margin.right]);
        //      .tickFormat(function(d) {

        // });

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom')
            .ticks(d3.time.hours, 2)
            .tickFormat(d3.time.format('%H:%M'))
            .tickSize(0)
            .tickPadding(8);

       svg.select("#x").append('g')
            .attr('class', 'x axis');
            // .attr('transform', 'translate(0, ' + (height - margin.top - margin.bottom) + ')')
            // .call(xAxis);

    });
}

fetchData();