// Set width, height, SVG variables

var w = document.querySelector("#chart").clientWidth;
var h = document.querySelector("#chart").clientHeight;

//Create SVG element
var svg = d3.select("#chart")
.append("svg")
.attr("width", w)
.attr("height", h);

// svgDoc.append("g").selectAll("circle")
//                 .data(eval("dataArray"+dataIndex))
//                 .enter()
//                 .append("circle")
//                 .attr("cx",function(d,i){
//                     var spacing = lineLength/(eval("dataArray"+dataIndex).length);
//                     return xBuffer+(i*spacing)
//                 })
//                 .attr("cy",yBuffer)
//                 .attr("r",function(d,i){return d});



//Append the static baseline circle
svg.append("g")
    .append("circle")
    .attr("cx", w/2)
    .attr("cy", h/2)
    .attr("r", w/3)
    .style("fill", "none")
    .style("stroke-width", "3px")
    .style("stroke", "black");

