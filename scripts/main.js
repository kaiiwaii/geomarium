var map = L.map('map').setView([0, 0], 0);
const borders = [81.505856, -528.75]
const borders2 = [-81.505856, 528.75]
var bounds = L.latLng(borders, borders2)

var tilelayer = L.tileLayer('tiles_nopoints/{z}/{x}/{y}.png', {
continuousWorld: false,
noWrap: true,  
minZoom: 2,
maxZoom: 4,
})

tilelayer.addTo(map);

// var marker = L.marker([0, 0], {
// draggable: true,
// }).addTo(map);
// marker.bindPopup('LatLng Marker').openPopup();
// marker.on('dragend', function(e) {
// marker.getPopup().setContent(marker.getLatLng().toString()).openOn(map);
// });

const cities_raw = dataPoints["cities"];
const villages_raw = dataPoints["villages"]

console.log("Cities Data:", cities_raw);
console.log("Villages Data:", villages_raw);


var citiesGroup = L.layerGroup(); // Cambio aquí: Utilizar L.layerGroup() en lugar de []
var villagesGroup = L.layerGroup(); // Cambio aquí: Utilizar L.layerGroup() en lugar de []

var cityIcon = L.divIcon({
    className: 'city-marker',
});
var villageIcon = L.divIcon({
    className: 'village-marker',
});


for(var c in cities_raw) {
    L.marker(cities_raw[c], {icon: cityIcon}).bindPopup(`<a href=cities/${c}/index.html><b>${c}</b></a>`).addTo(citiesGroup);

}

for(var v in villages_raw) {
    L.marker(villages_raw[v], {icon: villageIcon}).bindPopup(`<a href=villages/${v}/index.html><b>${v}</b></a>`).addTo(villagesGroup);
}


var languageControl = L.control({ position: "topright" });
languageControl.onAdd = function (map) {
    var div = L.DomUtil.create("div", "language-control");
    div.innerHTML = `
    <select onchange="changeLanguage(event)">
        <option value="en">English</option>
        <option value="es">Español</option>
    </select>
    `;
    return div;
};

languageControl.addTo(map);

    // Función para cambiar el idioma
function changeLanguage(event) {
    lang = event.target.value;
    // Eliminar la leyenda existente para actualizarla con el nuevo idioma
    // Actualizar la leyenda con el nuevo idioma
    updateLegend(lang);
}

function updateLegend(lang) {
    map.removeControl(layercontrol)
    var newoverlays = {}
    newoverlays[locales[lang]['misc']['legend']['cities']] = citiesGroup
    newoverlays[locales[lang]['misc']['legend']['villages']] = villagesGroup

    layercontrol = L.control.layers(null, newoverlays).addTo(map);
}

const overlays = {
    "Cities": citiesGroup,
    "Villages": villagesGroup
}
    
var layercontrol = L.control.layers(null, overlays).addTo(map);
map.addLayer(citiesGroup);
map.addLayer(villagesGroup);