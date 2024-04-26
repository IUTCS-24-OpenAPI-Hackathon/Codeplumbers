<script lang="ts">
  import { onMount } from "svelte";
  import maplibregl from "maplibre-gl";

  let mapContainer: any;
  let map: maplibregl.Map;

  export let lat: number = 40.7128;
  export let lon: number = -74.006;
  export let zoom: number = 7;

  const myAPIKey = "37b56c71535b48da909b01dc2bfec8b2";

  onMount(async () => {
    const mapStyle = "https://maps.geoapify.com/v1/styles/osm-carto/style.json";
    // const location: any = await getLocation();
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

    const marker = new maplibregl.Marker().setLngLat([lon, lat]).addTo(map);

    map.on("load", () => {
      if (map.isStyleLoaded()) {
        console.log("Map loaded");
      }
    });
  });

  $: if (map && map.isStyleLoaded()) {
    console.log("Now: ", lon, lat);
    map.setCenter([lon, lat]);
    map.setZoom(zoom);
  }
</script>

<div class="w-full h-full" bind:this={mapContainer}></div>