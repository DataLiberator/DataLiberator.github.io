var width = window.innerWidth;
var height = window.innerHeight;

var margin = {top: 20, right: 75, bottom: 50, left: 75};
var chartWidth = width - margin.left - margin.right;
var chartHeight = height - margin.top - margin.bottom;

// var parseDate = d3.timeParse("%d-%b-%y"); This stuff is returning null when I put it in front of date + time in the asteroidsObject
// var parseTime = d3.timeParse("%H-%M");

var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
//NASA Astroid API, found on this website:https://api.nasa.gov/
var realtimeURL = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=1993-07-31&end_date=1993-07-31&api_key=LBPa28DapgpXxWTBLaKb5fw8gCMzk7PCzt2cUaXv'; //currently the hard-coded date of my birthday. Will make it adjustable to different birthdays.
var birthday = '1993-07-31'; //Later: will make this variable change to be the date was last entered

var dataMax = 5;



// //get the date from the dropdown
// function onButtonPress() {
//         var x = document.getElementById("frm1");
//         var text = "";
//         var i;
//         for (i = 0; i < x.length ;i++) {
//           text += x.elements[i].value + "<br>";
//         }
//         document.getElementById("demo").innerHTML = text;
//       }
// //create the url

// //call fetchdata


function fetchData() {

    d3.json(realtimeURL, function (error, data) {
        
        // filling + printing dataArray
        var dataArray = []

        for (i = 0; i < data.near_earth_objects["1993-07-31"].length; i++) {
            var asteroid = data.near_earth_objects["1993-07-31"][i]

            var timeArray = asteroid["close_approach_data"][0]["close_approach_date_full"].split(" ")[1].split(":");

            var asteroidObject = {
                date: asteroid["close_approach_data"][0]["close_approach_date_full"],
                time: (timeArray[0]) + ":" + (timeArray[1]),
                maxDiameter: asteroid["estimated_diameter"]["feet"]["estimated_diameter_max"],
                hazardous: asteroid["is_potentially_hazardous_asteroid"]
            }

            dataArray.push(asteroidObject);
        };

    console.log(dataArray);

    //  // format the data
    // dataArray.forEach(function(d) {
    //     d.time = parseTime(d.time);
    //     d.date = parseDate(d.date);
    //     });
    // console.log(dataArray);


    // AXIS HIJINX

    // Add X axis
    var x = d3.scaleLinear()
    .domain([0, 4000])
    .range([ 0, chartWidth ]);

    svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + chartHeight + ")")
    .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, 500000])
    .range([ chartHeight, 0]);

    svg.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(y));
    
    });
};

fetchData();