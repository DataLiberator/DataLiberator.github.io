 
 d3.csv("./data/Artworks80YrData.csv", function(data){

    console.log(data);

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

    console.log(d3.max(lineData, function(d){ return d.totalPieces; })) // log highest number of pieces acquired on any day.

 // svg canvas
 // scales
 // path generator
 // enter/exit/update



    // console.log(data.DateAcquired); //OK, at least this did something. Lists all dates and how many things were acquired on those dates

// ------ CHART #1: Line chart of acquisitions per month between the two years ----------

    // Count # of objects in 1937, 2017

    // Sum acquisition amounts by month for each year.

    //line chart

// ------ CHART #2: Nationality Dots ----------
//Dots of one color represent # of distinct nationalities per year, size based on # acquisitions. Hover for year and number

    // Find n of distinct nationalities for both years.
    // Find count of acquisitions for each nationality for both years
    // Enter/exit/update of dots based on nationality, r scale by # acquisitions.
    // Tooltip to hover for nationality and number.
    // (Two separate charts, next to each other.)

// ------- CHART #3: Grouped bar chart by year, show % of M/F/U.
    // Find % M/F/U by year
    // Set up scales
    // Enter rect svgs for each year.



//PARSE?
// Split the dates into 1937 and 2017 separately, year and month
// 



});



