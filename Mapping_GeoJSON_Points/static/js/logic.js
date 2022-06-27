// Add console.log to check if the code is working
console.log("working");

// Create map object with a center and zoom level using setView
// setView([latitud, longiute], zoom level) zoom level on a scale of 0 to 18
    // let map = L.map('mapid').setView([40.7, -94.5],4);
    //let map = L.map('mapid', {center: [37.5, -122.5],zoom: 10});
// Create map object with a center and zoom level without setView
// This method is useful when we need to add multiple tile layers, or a background image of our map




// We create the tile layer that will be the background of our map. navigation-preview-night-v4/ light-v10 / dark-v10 / satellite-streets-v11 / streets-v11 / satellite-v9
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create base layer that holds both maps
let baseMaps = {
    Street: streets,
    Dark: dark
};

// Create the map object with center and zoom level.
let map = L.map('mapid', {
    center: [40.7, -94.5],
    zoom: 2,
    layers: [streets]
});

// Pass map layers into layers control and add the alyers control to the map
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/Jimena-QM/Mapping_Earthquakes/main/resources/majorAirports.json";

//Grabbing GeoJSON data
d3.json(airportData).then(function(data){
    console.log(data);
    //Creating a GeoJSOn layer with the retrieved data
    L.geoJSON(data, {
        onEachFeature: function(feature, layer){
        console.log(layer);
        layer.bindPopup("<h2>Airport code: " + feature.properties.faa + "</h2> <hr> <h3>Airport Name: "
        + feature.properties.name + "</h3>");
        }
        }).addTo(map);
});



//Grabbing GeoJSON data and adding markers with onEachFeature
// d3.json(airportData).then(function(data){
//     console.log(data);
//     //Creating a GeoJSOn layer with the retrieved data
//     L.geoJSON(data, {
//         onEachFeature: function(feature, layer){
//             console.log(layer);
//             layer.bindPopup("<h2>Airport code: " + feature.properties.faa + "</h2> <hr> <h3>Airport Name: "
//             + feature.properties.name + "</h3>");
//         }
//     }).addTo(map);
// });



// Add GeoJSON data
// let sanFranAirport=
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]  
//             //GeoJSON data coordinates are set with the first parameter as X (longitude)
//             //and the second parameter as Y (latitude)
//         }
// }]};

// Grabbing our GeoJSON data
    // Using pointToLayer and .binPopup
// L.geoJSON(sanFranAirport, {
//     // Turn each feature into a marker on the map
//     pointToLayer: function(feature, latlng){
//         console.log(feature);
//         return L.marker(latlng)
//         .bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3> " + feature.properties.city +
//         ", " + feature.properties.country + "</h3>");
//     }

// }).addTo(map);


// L.geoJSON(sanFranAirport, {
//     // Turn each feature into a marker on the map
//     onEachFeature: function(feature, layer) {
//         console.log(layer);
//         layer.bindPopup("<h2>Airport code: " + feature.properties.faa + "</h2> <hr> <h3>Airport name: "
//         + feature.properties.name + "</h3>");    
//     }

// }).addTo(map);
