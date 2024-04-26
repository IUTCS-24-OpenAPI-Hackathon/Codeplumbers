<script lang="ts">
  import { onMount } from "svelte";
  import maplibre from "maplibre-gl";
  import { getLocation } from "$lib/utils";

  let mapContainer: any;
  let map: maplibre.Map;

  export let lat: number = 0;
  export let lon: number = 0;
  export let zoom: number = 0;

  onMount(async() => {
    const myAPIKey = "37b56c71535b48da909b01dc2bfec8b2";
    const mapStyle = "https://maps.geoapify.com/v1/styles/osm-carto/style.json";
    // const location: any = await getLocation();
    const initialState = {
      lng: lon,
      lat: lat,
      zoom: zoom,
    };

    map = new maplibre.Map({
      container: mapContainer,
      style: `${mapStyle}?apiKey=${myAPIKey}`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });

    map.on('load', () => {
      if(map.isStyleLoaded()){
        console.log("Map loaded");
      }
    })
  });

  $: if(map && map.isStyleLoaded()) {
    console.log("Now: ", lon, lat);
    map.setCenter([lon, lat]);
    map.setZoom(zoom);
  }
</script>

<div class="w-full h-full" bind:this={mapContainer}></div>
