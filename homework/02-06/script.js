var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var element = d3.select('#chart').node();
var divWidth = element.getBoundingClientRect().width; //actually divWidth!
var divHeight = element.getBoundingClientRect().height;

var margin = {top: 10, right: 30, bottom: 30, left: 60};
    chartWidth = divWidth,//- margin.left - margin.right,
    chartHeight = divHeight;// - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#chart")
  .append("svg")
    .attr("width", chartWidth + margin.left + margin.right)
    .attr("height", chartHeight + margin.top + margin.bottom)
  .append("g");
    // .attr("transform",
    //       "translate(" + margin.left + "," + margin.top + ")");

var barWidth = "5px";
var barHeight = chartHeight;

    
//NASA Astroid API, found on this website:https://api.nasa.gov/
var realtimeURL = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=1993-07-31&end_date=1993-07-31&api_key=LBPa28DapgpXxWTBLaKb5fw8gCMzk7PCzt2cUaXv'; //currently the hard-coded date of my birthday, later could make it adjustable to different birthdays.

function fetchData() {

    d3.json(realtimeURL, function (error, data) {

        // Parsing the time as they give it to us in string –> D3 time format
        var parseTime = d3.timeParse("%Y-%b-%d %I:%M");

        var parsedDate = parseTime("1993-Jul-31 11:42");

        var formatTime = d3.timeFormat("%I:%M");

        console.log(formatTime(parsedDate));
        
        // filling + printing dataArray
        var dataArray = []

        for (i = 0; i < data.near_earth_objects["1993-07-31"].length; i++) {
            var asteroid = data.near_earth_objects["1993-07-31"][i]

            var timeArray = asteroid["close_approach_data"][0]["close_approach_date_full"].split(" ")[1].split(":");

            var asteroidObject = {
                date: asteroid["close_approach_data"][0]["close_approach_date_full"],
                time: (timeArray[0]) + "." + (timeArray[1]), //This is hacky and not correct. 11.42 is not the same as 11:42... but I'm just trying to get the bars to respond to actual data.
                asteroidParsedTime: formatTime(timeArray[0]) + ":" + (timeArray[1]),
                maxDiameter: asteroid["estimated_diameter"]["feet"]["estimated_diameter_max"],
                hazardous: asteroid["is_potentially_hazardous_asteroid"]
            }

            dataArray.push(asteroidObject);
        };

    console.log(dataArray);
    // Color function
    function barColor(){
        if(hazardous == "true" ){return "red"}
        else {return "white"} 
      };

      // Create a color picker function
      function colorPicker(d) {
            if (d.hazardous == "true"){return "red"}
            else {return "white"};
        };

     // AXIS HIJINX

    // Add X axis
    var x = d3.scaleLinear() //scaleTime not working
    .domain([0, 24])
    .range([ 5, chartWidth ]);

    svg.append("g")
    .attr("transform", "translate(0," + chartHeight + ")")
    .attr("stroke", "white")
    .style("font-family", "Courier New")
    .style("font-size", "14px")
    .call(d3.axisBottom(x));

    // // Add Y axis
    // var y = d3.scaleLinear()
    // .domain([0, 0])
    // .range([ chartHeight, 0]);
    // svg.append("g")
    // .call(d3.axisLeft(y));

    // APPEND SHAPES
    svg.selectAll("#chart")
    .data(dataArray)
    .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d){
            return +d.time * 30; // Had to add hacky *30px. Why is time not scaling on the X-axis? It's going literally 11.42 pixels etc. Would expect to stretch to chartWidth.
        })
        // .attr("x", function(d){  //This just gets bars to show up evenly spaced.
        //     return i ++ * 50;
        // })
        .attr("width", "10px")
        // .attr("fill", "white")
        .attr("fill", function(d){       //Why is this not working? d.forEach gives syntax errors, returning all white, not red
            for(i = 0; i<5; i++){
                return colorPicker(d);
            }  
        })
        .attr("y",chartHeight-chartHeight)
        .attr("height", chartHeight);

    
    });
};

fetchData();