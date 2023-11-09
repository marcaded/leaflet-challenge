// query url
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Start map
var myMap = L.map("map", {
    center: [0, 0], 
    zoom: 2 
});

// Add base layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// color
function getColor(magnitude) {
    
    return magnitude > 6 ? "#FF5733" :
           magnitude > 5 ? "#FF8C33" :
           magnitude > 4 ? "#FFB733" :
           magnitude > 3 ? "#FFDA33" :
           "#FFE933";
}

// create markers
function createFeatures(earthquakeData) {
    L.geoJSON(earthquakeData, {
        pointToLayer: function (feature, latlng) {
            
            return L.circleMarker(latlng, {
                radius: feature.properties.mag * 5, 
                fillColor: getColor(feature.properties.mag), 
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        },
        onEachFeature: function (feature, layer) {
            // Popups 
            layer.bindPopup("<h3>" + feature.properties.place +
                "</h3><hr><p>Magnitude: " + feature.properties.mag +
                "<br>Depth: " + feature.geometry.coordinates[2] + "</p>");
        }
    }).addTo(myMap);
}

d3.json(queryUrl).then(function (data) {
    
    createFeatures(data.features);
});