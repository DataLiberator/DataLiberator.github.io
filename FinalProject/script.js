 
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

    var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

    // Color picker
    function colorPicker(d){
        console.log(d[0].year);

        if (d[0].year == "1937") { return "#000000"}
        else {return "#cc0000"};
    };

    //Format months from numbers to words
    function month(d){
        return d3.timeFormat("%b")(new Date((d+1) + "/01/2017"))
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
        d.year = d.date.getFullYear();
        d.month = d.date.getMonth();
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
.domain([0, 300])
.range([height-margin.bottom, margin.top]);

 // path generator
 var line = d3.line()
.x(function(d) { return xScale(d.date.getMonth()); })
.y(function(d) { return yScale(d.totalPieces); })
// .curve(d3.curveLinear)
.curve(d3.curveMonotoneX);

//Create circle elements with LineData so that tooltip knows where to pop up.
//http://www.dave-landry.com/classes/artg5430-spring2020/lectures/03_12_code.html
// Focus on how it calculates the x + y (keep it simple!)

//Add lines to chart
svg.selectAll(".line")
        .data([data1937, data2017])
        .enter()
        .append("path")
        .attr("class", "line")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke-width", "3")
        .style("stroke", colorPicker);

//Add dots and tooltip to chart
//Inspired by: https://bl.ocks.org/wnghdcjfe/6377d75c963e8f841609a7bf6d3d0c74
var dot = svg.selectAll("dot")
                .data(lineData)
                .enter().append("circle")
                .attr("r", 5);

dot.attr("cx", function (d) {
    return xScale(d.month);
})
.attr("cy", function (d) {
    return yScale(d.totalPieces);
})
.on("mouseover", function (d) {
    div.transition()
        .duration(100)
        .style("opacity", .9);
    div.html("<p> Acquisitons in " + month + ": </p> <p>" + d.totalPieces + "</p>")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
});


// axes
var xAxis = svg.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0, ${height-margin.bottom})`)
    .call(d3.axisBottom().scale(xScale).tickFormat(month));

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

var chartTitle = svg.append("text")
        .attr("class","axisLabel")
        .attr("x", width/3)
        // .attr("text-align", "center")
        .attr("y", height - (height-margin.top))
        .text("MoMA Acquisitions per Month");

//handmade legend hijinx (Code source: https://www.d3-graph-gallery.com/graph/custom_legend.html)
var legend = d3.select("#legend");
var square = 15;
var spacing = 30;
var whiteHeight = 10;
var redHeight = 45;
var offset = 13;

legend.append("rect")
  .attr("width", square)
  .attr("height",square)
  .attr("x", 0)
  .attr("y", whiteHeight)
  .style("fill", "black");

legend.append("rect")
  .attr("width", square)
  .attr("height",square)
  .attr("x", 0)
  .attr("y", redHeight)
  .style("fill", "#CC0000");

legend.append("text")
  .attr("id", "legendText")
  .attr("x", spacing)
  .attr("y", whiteHeight + offset)
  .text("1937")
  .style("fill", "black")
  .style("font-size", "14");

legend.append("text")
  .attr("id", "legendText")
  .attr("x", spacing)
  .attr("y", redHeight+offset)
  .text("2017")
  .style("fill", "black")
  .style("font-size", "14");


//end handmade legend stuff


});
