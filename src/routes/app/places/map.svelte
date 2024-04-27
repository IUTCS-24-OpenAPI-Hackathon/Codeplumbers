<script lang="ts">
  import { onMount, tick } from "svelte";
  import maplibregl from "maplibre-gl";

  let mapContainer: HTMLDivElement;
  let map: maplibregl.Map;
  let marker: maplibregl.Marker;
  export let lat: number = 40.7128;
  export let lon: number = -74.006;
  export let zoom: number = 7;
  const myAPIKey = "37b56c71535b48da909b01dc2bfec8b2";

  onMount(async () => {
    const mapStyle = "https://maps.geoapify.com/v1/styles/osm-carto/style.json";
    const initialState = {
      lng: lon,
      lat: lat,
      zoom: zoom,
    };

    map = new maplibregl.Map({
      container: mapContainer,
      style: `${mapStyle}?apiKey=${myAPIKey}`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });
    
    map.on("idle", () => {
      map.setCenter([lon, lat]);
      map.setZoom(zoom);
    })

    map.on("load", async () => {
      if (map.isStyleLoaded()) {
        console.log("Map loaded");
        marker = new maplibregl.Marker({color: "red"}).setLngLat([lon+0.35, lat+0.41]).addTo(map);
        await tick(); // Wait for Svelte to update the DOM
      }
    });
  });

  $: {
    if (map && map.isStyleLoaded() && marker) {
      // console.log("Now: ", lon, lat);
      marker.setLngLat([lon+0.35, lat+0.41]).addTo(map);
      // map.setCenter([lon, lat]);
      // map.setZoom(zoom);
    }
  }
</script>

<div class="w-full h-full" bind:this={mapContainer}></div>