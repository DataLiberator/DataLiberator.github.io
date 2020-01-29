// Set width, height, SVG variables

var w = document.querySelector("#chart").clientWidth;
var h = document.querySelector("#chart").clientHeight;

//Create SVG element
var svg = d3.select("#chart")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

// Creating the data variables
var dataMax = 1;
var data = [];
var dataTwo = 2;
var dataCompare = [];

console.log(data);

// // Color picker function
// function circleColor() {

//     //last number
//     if () { return "#ECE8DC" } // bigger than last number
//     else if () { return "#BDB8B0" }
//     else if () { return "#76695C" }

// };

// Running the API
var realtimeURL = "https://whiteboard.datawheel.us/api/google-analytics/realtime/random";
var frequency = 1 * 1000; // 5 seconds

// Domain/Range for r
var r = d3.scaleLinear()
    .domain([0, 150])
    .range([0, w/4]);

function fetchData() {

    d3.json(realtimeURL, function(error, users){
        dataCompare.unshift(users);
        if (dataCompare.length > dataTwo) data.pop();
        
        console.log(dataCompare);
    })

    d3.json(realtimeURL, function (error, users) {
        data.unshift(users);
        if (data.length > dataMax) data.pop();

        console.log(data);


        // Enter-Update-Exit for dynamic circle

        //Enter
        var circle = svg.selectAll(".dataCircle")
            .data(data);

        circle.enter().append("circle")
            .attr("class", "dataCircle")
            .attr("cx", w / 2)
            .attr("cy", h / 2)
            .attr("r", r) // use custom radius function
            .style("fill", "none")
            .style("stroke-width", "5px")
            .style("stroke", "cornflowerblue"); // use color picker function

        //Update
        circle.transition()
            .duration(frequency/2)
            .attr("r", r);
            

        //Exit not necessary with just one
       


        // Need some sort of domain/range dealio to make the static circle be proportional to the dynamic one.

        // color picker function, teal if > last, dark teal if = last, hot pink if < last





    });
};

fetchData();
setInterval(fetchData, frequency);



//Append the static baseline circle
svg.append("g")
    .append("circle")
    .attr("cx", w / 2)
    .attr("cy", h / 2)
    .attr("r", r(100))
    .style("fill", "none")
    .style("stroke-width", "3px")
    .style("stroke", "black");

// Append the dynamic circle


// 

