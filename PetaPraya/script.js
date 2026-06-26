// Inisialisasi peta
const map = L.map("map");

// Basemap OpenStreetMap
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

// Memuat file GeoJSON
fetch("data/polygon.geojson")
    .then(response => response.json())
    .then(data => {

        const geojsonLayer = L.geoJSON(data, {

            style: function () {
                return {
                    color: "#0066cc",
                    weight: 2,
                    fillColor: "#66b3ff",
                    fillOpacity: 0.4
                };
            },

            onEachFeature: function (feature, layer) {

                const p = feature.properties;

                layer.bindPopup(`
                    <h3>${p.namasls ?? "Tanpa Nama"}</h3>
                    <b>Desa:</b> ${p.nmdesa ?? "-"}<br>
                    <b>Kecamatan:</b> ${p.nmkec ?? "-"}<br>
                    <b>Jumlah KK:</b> ${p.jmlhKK ?? "-"}<br>
                    <b>Jumlah UF:</b> ${p.jmlhUF ?? "-"}
                `);

            }

        }).addTo(map);

        // Zoom otomatis ke seluruh polygon
        map.fitBounds(geojsonLayer.getBounds());

    })
    .catch(err => {
        console.error("Gagal memuat GeoJSON:", err);
    });