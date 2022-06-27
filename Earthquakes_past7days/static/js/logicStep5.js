// Add console.log to check if the code is working
console.log("working");

// Create map object with a center and zoom level using setView
// setView([latitud, longiute], zoom level) zoom level on a scale of 0 to 18
    // let map = L.map('mapid').setView([40.7, -94.5],4);
    //let map = L.map('mapid', {center: [37.5, -122.5],zoom: 10});
// Create map object with a center and zoom level without setView
// This method is useful when we need to add multiple tile layers, or a background image of our map




// We create the tile layer that will be the background of our map. navigation-preview-night-v4/ light-v10 / dark-v10 / satellite-streets-v11 / streets-v11 / satellite-v9
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create base layer that holds both maps
let baseMaps = {
    Streets: streets,
    Satellite: satelliteStreets
};

// Create the earthquake layer for map
let earthquakes = new L.layerGroup();
// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
  Earthquakes: earthquakes
};


// Create the map object with center and zoom level.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// Pass map layers into layers control and add the alyers control to the map
L.control.layers(baseMaps, overlays).addTo(map);

//Grabbing GeoJSON data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data){
// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }

  // This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }

//Creating a GeoJSOn layer with the retrieved data
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        // We create a popup for each circleMarker to display the magnitude and
        //  location of the earthquake after the marker has been created and styled.
        onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
      }
    }).addTo(earthquakes);

    //Add the earthquake layer to map
    earthquakes.addTo(map);
    // Create a legend control object.
    let legend = L.control({position: "bottomright"});
    // Then add all the details for the legend.
    legend.onAdd = function() {
      let div = L.DomUtil.create("div", "info legend");
      const magnitudes = [0, 1, 2, 3, 4, 5];
      const colors = [
        "#98ee00",
        "#d4ee00",
        "#eecc00",
        "#ee9c00",
        "#ea822c",
        "#ea2c2c"];
    // Looping through our intervals to generate a label with a colored square for each interval.
      for (var i = 0; i < magnitudes.length; i++) {
      console.log(colors[i]);
      div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
 }
  return div;

    };
legend.addTo(map);
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
