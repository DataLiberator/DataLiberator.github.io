 
 d3.csv("./data/Artworks80YrData.csv", function(data){

    // console.log(data);

    // var width = document.querySelector("#chart").clientWidth;
    // var height = document.querySelector("#chart").clientHeight;
    var width = document.querySelector("#chart").clientWidth;
    var height = 0.5*(width);
    var margin = {top: 50, left: 150, right: 50, bottom: 150};

    var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "#F5F5F5");

    // Color picker
    function colorPicker(d){
        if (d.date.getFullYear() === "1937") { return "#000000"}
        else {return "#cc0000"};
    };

    var lineData = d3.nest()
        .key(function(d){
            var date = new Date(d.DateAcquired.replace("/37", "/1937"))
            return (date.getMonth() + 1) + "/01/" + date.getFullYear();
        })
        .entries(data);

    lineData.forEach(function(d){ // looping through nested array of just date acquired
        d.totalPieces = d.values.length;
        d.date = new Date(d.key)
    });

    console.log(lineData);

    var maxPieces = d3.max(lineData, function(d){ return d.totalPieces; })
    var minPieces = d3.min(lineData, function(d){ return d.totalPieces; })

 // Create the scales

var xScale = d3.scaleLinear()
.domain([0,11])
.range([margin.left, width-margin.right]);

var yScale = d3.scaleLinear()
.domain([0, maxPieces])
.range([height-margin.bottom, margin.top]);

 // path generator
 var line = d3.line()
.x(function(d) { return xScale(d.date.getMonth()); })
.y(function(d) { return yScale(d.totalPieces); })
.curve(d3.curveLinear);

// Append Paths and Lines
lineData.forEach( function(d){

    console.log(d);

    svg.append("path")
    .data([lineData])
    .attr("class", "line")
    .attr("d", line)
    .style("fill", "none")
    .style("stroke-width", "3")
    .style("stroke", "black");
  
// var thisYear = lineData.filter(function(v) {
//    return v.name === d;
//    }).sort(function(a,b) { return a.year - b.year; });

//    svg.append("path")
//      .datum(thisYear)
//      .attr("d", function(v){ return line(v); })
//      .attr("stroke", function(){ return colorPicker(d);})
//      .attr("fill", "none")
//      .attr("stroke-width", 3);
   
//    svg.selectAll("circle")
//      .data(thisYear)
//      .enter()
//      .append("circle")
//        .attr("cx", function(v) { return xScale(v.month); })
//        .attr("cy", function(v) { return yScale(v.acquisitions); })
//        .attr("r",2)
//        .attr("fill", function (){ return colorPicker(d)})
//        .attr("stroke-width",2);
   
});

// axes
var xAxis = svg.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0, ${height-margin.bottom})`)
    .call(d3.axisBottom().scale(xScale));

var yAxis = svg.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${margin.left},0)` )
    .call(d3.axisLeft().scale(yScale));

var xAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("x", width/2)
        .attr("y", height-((margin.bottom/2)+30))
        .text("Month");

 var yAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("transform","rotate(-90)")
        .attr("x",-height/1.75)
        .attr("y", (margin.left/2)-30)
        .text("Number of Acquisitions");
 // enter/exit/update

});



