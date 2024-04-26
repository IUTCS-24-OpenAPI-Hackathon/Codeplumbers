<script lang="ts">
  import Map from "./map.svelte";
  import { getPlaces, searchPlace } from "$lib";
  let selectedCategoryOfPlace = "";
  let locationName = "my location";
  let places: any[] = [];
  let lat: number;
  let lon: number;
  let zoom: number;

  async function query() {
    const categories = `${selectedCategoryOfPlace}`;
    places = await getPlaces(categories, locationName);

    const location: any = await searchPlace(locationName);
    console.log(location);
    lat = location.lat;
    lon = location.lon;
    zoom = 10;
    console.log(lat, lon, zoom);
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
      <button class="btn btn-secondary" on:click={query}>Search</button>
    </div>
    <Map {lat} {lon} {zoom} />
  </div>
  <ul
    class="hidden md:flex flex-col menu bg-base-200 w-1/4 h-full rounded-box overflow-y-scroll overflow-x-hidden"
  >
    <h1 class="text-3xl p-5">Places</h1>
    {#each places as place}
      <li class="btn btn-ghost p-3 text-left">{place.name}</li>
    {/each}
  </ul>
</div>
