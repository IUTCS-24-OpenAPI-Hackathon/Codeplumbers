<script lang="ts">
  import maplibregl from "maplibre-gl";
  import { getPlaces, searchPlace } from "$lib";
  import { tick } from "svelte";
  let selectedCategoryOfPlace = "";
  let locationName = "";
  let places: any[] = [];
  let lat: number;
  let lon: number;
  let zoom: number;
  let radius: number;
  let mapContainer: HTMLDivElement;
  let map: maplibregl.Map;

  async function query() {
    const categories = `${selectedCategoryOfPlace}`;
    places = await getPlaces(categories, locationName, radius);
    console.log("kottheke:", places);

    const location: any = await searchPlace(locationName);
    console.log(location);
    lat = location.lat;
    lon = location.lon;
    zoom = 10;
    loadMap(lat, lon, zoom, places);
  }
  const loadMap = (lat: any, lon: any, zoom: any, allPlaces: any) => {
    const myAPIKey = "37b56c71535b48da909b01dc2bfec8b2";
    // console.log(lat, lon, zoom);
    const mapStyle = "https://maps.geoapify.com/v1/styles/osm-carto/style.json";
    map = new maplibregl.Map({
      container: mapContainer,
      style: `${mapStyle}?apiKey=${myAPIKey}`,
      center: [lon, lat],
      zoom: zoom,
    });
    
    map.on("idle", () => {
      map.setCenter([lon, lat]);
      map.setZoom(zoom);
    })

    map.on("load", async () => {
      if (map.isStyleLoaded()) {
        allPlaces.forEach((place:any) => {
          const marker = new maplibregl.Marker({color: "red"}).setLngLat([place.lon+0.5, place.lat+0.51]).addTo(map);
        });
        await tick(); // Wait for Svelte to update the DOM
      }
    });
  }
  const addMarker = (lon:number, lat:number) => {
    lat = lat;
    lon = lon;
    console.log("mara khaisi")
    // loadMap(-12, 90, 20);
  }
</script>

<div class="flex h-screen w-screen overflow-scroll gap-2">
  <div class="flex flex-col w-3/4 md:my-20 md:mx-20 h-full gap-2">
    <div>
      <select
        bind:value={selectedCategoryOfPlace}
        class="select select-bordered w-full max-w-xs"
      >
        <option disabled value="">Specify a Type of Place</option>
        <option>Entertainment</option>
        <option>Natural</option>
        <option>Tourism</option>
      </select>
      <!-- <select bind:value={selectedTypeOfPlace} class="select select-bordered w-full max-w-xs">
          <option disabled value="">Specify a Type of Place</option>
          <option>Entertainment</option>
          <option>Park</option>
          <option>Museum</option>
        </select> -->
      <input
        bind:value={locationName}
        class="input input-bordered"
        placeholder="Give a Location..."
      />
      <input bind:value={radius} class="input input-bordered" placeholder="Radius">
      <button class="btn btn-secondary" on:click={query}>Search</button>
    </div>
    <div class="w-full h-full overflow-hidden" bind:this={mapContainer}></div>  </div>
  <ul
    class="hidden md:flex flex-col menu bg-base-200 w-1/4 h-full rounded-box overflow-y-scroll overflow-x-hidden"
  >
    <h1 class="text-3xl p-5">Places</h1>
    {#each places as place}
    <div class="collapse bg-base-200">
      <input type="checkbox" /> 
      <div class="collapse-title font-medium">
        {place.name}
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="collapse-content text-xs" on:click={() => addMarker(place.lon, place.lat)}> 
        <p>lng: {place.lon}N </p> <p> lat: {place.lat}E</p>
      </div>
    </div>
    {/each}
  </ul>
</div>
