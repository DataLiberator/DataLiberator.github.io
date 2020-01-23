// Set width, height, SVG variables

var w = document.querySelector("#chart").clientWidth;
var h = document.querySelector("#chart").clientHeight;

//Create SVG element
var svg = d3.select("#chart")
.append("svg")
.attr("width", w)
.attr("height", h);

// Need some sort of domain/range dealio to make the static circle be proportional to the dynamic one.

// color picker function, teal if > last, dark teal if = last, hot pink if < last


var data = 120; // Data value, "# of pageviews"

//Append the static baseline circle
svg.append("g")
    .append("circle")
    .attr("cx", w/2)
    .attr("cy", h/2)
    .attr("r", w/5)
    .style("fill", "none")
    .style("stroke-width", "3px")
    .style("stroke", "black")
    .append("text", "100 visitors");

// Append the dynamic circle


// 

