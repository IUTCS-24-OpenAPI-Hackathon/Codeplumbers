<!-- Map.svelte -->
<script>
    import { onMount } from "svelte";
    import L from "leaflet";

    let map;

    // Function to initialize the map
    function initializeMap() {
        map = L.map("map").setView([23.7644025, 90.389015], 14); // Set initial map view to the specific location

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Marker for the specific location
        L.marker([23.7644025, 90.389015])
            .addTo(map)
            .bindPopup("Your location")
            .openPopup();
    }

    // Initialize the map when the component is mounted
    onMount(() => {
        initializeMap();
    });
</script>

<div id="map"></div>

<style>
    #map {
        height: 400px;
    }
</style>
