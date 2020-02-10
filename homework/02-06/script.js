var width = window.innerWidth;
var height = window.innerHeight;

var margin = {top: 20, right: 75, bottom: 50, left: 75};
var chartWidth = width - margin.left - margin.right;
var chartHeight = height - margin.top - margin.bottom;

//NASA Astroid API, found on this website:https://api.nasa.gov/
var realtimeURL = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=1993-07-31&end_date=1993-07-31&api_key=LBPa28DapgpXxWTBLaKb5fw8gCMzk7PCzt2cUaXv'; //currently the hard-coded date of my birthday. Will make it adjustable to different birthdays.
var data = [];
var birthday = '1993-07-31'; //Later: will make this variable change to be the date was last entered

function fetchData() {

    d3.json(realtimeURL, function (error, near_earth_objects) {
       
// filling data variable
// I want the dataObject to contain:
        //url: nasa_jpl_url,
        //maxDiameter: estimated_diameter_max(feet),
        //hazardous: is_potentially_hazardous_asteroid,
        //dateTime: close_approach_date_full,
        //velocity: relative_velocity.miles_per_hour

     var dataObject = { // How do you link down in the structure? At this stage, how do you see the structure in the console to know what things are named?
       url:birthday.nasa_jpl_url,
       maxDiameter:estimated_diameter.feet.estimated_diameter_max
     };

    
     
     data.unshift(dataObject); //Want the dataObject info to go into data[]... although, maybe since I'm not doing live updates it's enough to just keep it in dataObject.
     
     console.log(dataObject);
     console.log(data);

    });
}

fetchData();