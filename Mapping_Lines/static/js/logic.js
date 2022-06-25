// Add console.log to check if the code is working
console.log("working");

// Create map object with a center and zoom level using setView
// setView([latitud, longiute], zoom level) zoom level on a scale of 0 to 18
    // let map = L.map('mapid').setView([40.7, -94.5],4); 37.6213, -122.3790
    // let map = L.map('mapid', { center: [36.1733, -120.1794],zoom: 7});
// Create map object with a center and zoom level without setView
// This method is useful when we need to add multiple tile layers, or a background image of our map

let map = L.map('mapid').setView([40.7, -94.5], 5);

// Coordinate for LAX and SFO to be used in polyline
let line = [
    [37.615223, -122.389977], //SFO
    [37.030792,-113.508987 ], // SGU
    [32.848152, -96.851349],     //Dallas 
    [43.6777, -79.6248],      //YYZ
    [40.641766,-73.780968]  //JFK
];

// Create polyline using line coordinates and make line red
L.polyline(line, {
    color: "blue",
    dashArray: "10",
    opacity: 0.5
}).addTo(map);

// Get data from cities.js
// let cityData = cities;

// Loop through the cities array and create one marker for each city

// cityData.forEach(function(city) {
//     console.log(city)
//     L.circleMarker(city.location, {
//         radius: city.population/200000,
//         color: "orange",
//         fillColor: "#ffffa1"

//     })
//     .bindPopup("<h2>" + city.city +", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//     .addTo(map);
// });

// We create the tile layer that will be the background of our map. streets-v11 / dark-v10 / satellite-streets-v11
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 7,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);