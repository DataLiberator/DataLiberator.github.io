 
 d3.csv("./data/Artworks80YrData.csv", function(data){

    // console.log(data);

    // var width = document.querySelector("#chart").clientWidth;
    // var height = document.querySelector("#chart").clientHeight;
    var width = document.querySelector("#chart").clientWidth;
    var height = 0.5*(width);
    var margin = {top: 50, left: 175, right: 200, bottom: 75};

    var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "#F5F5F5");

    // // Color picker
    // function colorPicker(d){
    //     if (d.year == "1937") { return "#000000"}
    //     else {return "#cc0000"};
    // };

    var lineData = d3.nest()
        .key(function(d){
            var date = new Date(d.DateAcquired.replace("/37", "/1937"))
            return (date.getMonth() + 1) + "/01/" + date.getFullYear();
        })
        .entries(data);

    lineData.forEach(function(d){ // looping through nested array of just date acquired
        d.totalPieces = d.values.length;
        d.date = new Date(d.key)
        d.year = d.date.getFullYear();
    });

    console.log(lineData);

 // Split by Year
 var data1937 = lineData.filter(function(d){
     return d.year == 1937;
    });
var data2017 = lineData.filter(function(d){
        return d.year == 2017;
    });

    var maxPieces = d3.max(lineData, function(d){ return d.totalPieces; })
    var minPieces = d3.min(lineData, function(d){ return d.totalPieces; })

 // Create the scales

var xScale = d3.scaleLinear()
.domain([0,11])
// .domain([new Date("2017-01-01"), new Date("2017-12-31")])
.range([margin.left, width-margin.right]);

var yScale = d3.scaleLinear()
.domain([0, maxPieces])
.range([height-margin.bottom, margin.top]);

 // path generator
 var line = d3.line()
.x(function(d) { return xScale(d.date.getMonth()); })
.y(function(d) { return yScale(d.totalPieces); })
// .curve(d3.curveLinear)
.curve(d3.curveMonotoneX);

// Tooltip info
// function tooltip(d){
//     var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
//     var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + height / 2;
//     d3.select("#tooltip")
//         .style("left", xPosition + "px")
//         .style("top", yPosition + "px")
//         .select("#value")
//         .text(d);
//     d3.select("#tooltip").classed("hidden", false);
// };

// function tooltipOut(d){
//     d3.select("#tooltip").classed("hidden", true);
//    };

// Append Paths and Lines
lineData.forEach(function(d){
     svg.append("path")
    .data([data1937])
    .attr("class", "line")
    .attr("d", line)
    .style("fill", "none")
    .style("stroke-width", "3")
    .style("stroke", "black");
    // .on("mouseover", tooltip())
    // .on("mouseout", tooltipOut());
});

lineData.forEach( function(d){
        svg.append("path")
        .data([data2017])
        .attr("class", "line")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke-width", "3")
        .style("stroke", "#cc0000");
    });

// axes
var xAxis = svg.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0, ${height-margin.bottom})`)
    .call(d3.axisBottom().scale(xScale)); //.tickFormat(d3.timeFormat("%b")

var yAxis = svg.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${margin.left},0)` )
    .call(d3.axisLeft().ticks(8).scale(yScale));

var xAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("x", width/2)
        .attr("y", height-((margin.bottom - 50)))
        .text("Month");

 var yAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("transform","rotate(-90)")
        .attr("x",-height/1.5)
        .attr("y", (margin.left-50))
        .text("Number of Acquisitions");
 // enter/exit/update

});
