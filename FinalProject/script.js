 
 d3.csv("./data/Artworks80YrData.csv", function(data){

// IT'S A SETUP!
    var width = document.querySelector("#chart").clientWidth*.75;
    var height = 0.5*(width);
    var margin = {top: 50, left: 175, right: 200, bottom: 75};

    // Create chart SVG
    var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "#F5F5F5");

    // Create Tooltip Div
    var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// FIRST, FUN WITH FUNCTIONS

    // Color picker
    function colorPicker(d){
        if (d[0].year == "1937") { return "#000000"}
        else {return "#cc0000"};
    };

    // Color picker for dots, beccause they're weird and different
    function dotColorPicker(d){
        if (d.year == "1937") { return "#000000"}
        else {return "#cc0000"};
    };

    // Format months from numbers to shortened month for X-axis
    function month(d){
        return d3.timeFormat("%b")(new Date((d+1) + "/01/2017"))
    };

    // Format months from numbers to full month
    function fullMonth(d){
        return d3.timeFormat("%B")(new Date((d+1) + "/01/2017"))
    };

// NOW, LET'S FORMAT OUR DATA
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

    // Split data by Year
    var data1937 = lineData.filter(function(d){
        return d.year == 1937;
        });
    var data2017 = lineData.filter(function(d){
            return d.year == 2017;
        });

// ON TO THE CHART-MAKING!

    // Create the X and Y scales
    var xScale = d3.scaleLinear()
    .domain([0,11])
    .range([margin.left, width-margin.right]);

    var yScale = d3.scaleLinear()
    .domain([0, 300])
    .range([height-margin.bottom, margin.top]);

    // Make a cheeky lil' path generator
    var line = d3.line()
    .x(function(d) { return xScale(d.date.getMonth()); })
    .y(function(d) { return yScale(d.totalPieces); })
    .curve(d3.curveMonotoneX); // curveMonoToneX to make it sexy.

    //The main event! Adding lines to the chart:
    svg.selectAll(".line")
            .data([data1937, data2017])
            .enter()
            .append("path")
            .attr("class", "line")
            .attr("d", line)
            .style("fill", "none")
            .style("stroke-width", "3")
            .style("stroke", colorPicker);

    //Gotta set up the bones for some data point dots to chart (inspired by: https://bl.ocks.org/wnghdcjfe/6377d75c963e8f841609a7bf6d3d0c74)
    var dot = svg.selectAll("dot")
                    .data(lineData)
                    .enter().append("circle")
                    .attr("r", 5);

    // Let's set up for a tooltip while we're at it:
    var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

    // Ok, now we're adding the dots, and calling a tooltip on mouseover.
    dot.attr("cx", function (d) {
        return xScale(d.month);
    })
    .attr("cy", function (d) {
        return yScale(d.totalPieces);
    })
    .style("fill", dotColorPicker)
    .on("mouseover", function(d) { 
        div.transition()        
            .duration(100)      
            .style("opacity", 1); 

        div .html(fullMonth(d.month) + " " + d.year + ": <br/>" + d.totalPieces + " pieces")  
            .style("left", (d3.event.pageX + 15) + "px")     
            .style("top", (d3.event.pageY - 28) + "px");    
        })                  
    .on("mouseout", function(d) {       
        div.transition()        
            .duration(500)      
            .style("opacity", 0);   
    });

    //What's a chart without  axes, axis labels, and a title? Not a good chart. So let's add 'em.
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
            .text("MoMA Acquisitions per Month")
            .style("font-weight", "600");

    //And finally, let's end with a legendary legend.(Code source: https://www.d3-graph-gallery.com/graph/custom_legend.html)
    var square = 15;
    var spacing = width - 80;
    var boxSpacing = spacing - 30;
    var whiteHeight = 235;
    var redHeight = 200;
    var offset = 13;

    svg.append("rect")
    .attr("width", square)
    .attr("height",square)
    .attr("x", boxSpacing)
    .attr("y", whiteHeight)
    .style("fill", "black");

    svg.append("rect")
    .attr("width", square)
    .attr("height",square)
    .attr("x", boxSpacing)
    .attr("y", redHeight)
    .style("fill", "#CC0000");

    svg.append("text")
    .attr("id", "legendText")
    .attr("x", spacing)
    .attr("y", whiteHeight + offset)
    .text("1937")
    .style("fill", "black")
    .style("font-size", "14");

    svg.append("text")
    .attr("id", "legendText")
    .attr("x", spacing)
    .attr("y", redHeight+offset)
    .text("2017")
    .style("fill", "black")
    .style("font-size", "14");

    });
