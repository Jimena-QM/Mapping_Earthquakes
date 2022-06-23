// Add console.log to check if the code is working
console.log("working");

// Create map object with a center and zoom level using setView
// setView([latitud, longiute], zoom level) zoom level on a scale of 0 to 18
    // let map = L.map('mapid').setView([40.7, -94.5],4);

// Create map object with a center and zoom level without setView
// This method is useful when we need to add multiple tile layers, or a background image of our map

let map = L.map('mapid', {
    center: [
        40.7, -94.5
    ],
    zoom: 4
});

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);