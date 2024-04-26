<script lang="ts">
  import { getLocation } from "$lib/utils";
  import { getPlaces, searchPlace } from "$lib";
  let selectedCategoryOfPlace = "";
  let locationName = "my location";
  let places: any[] = [];

  async function query() {
    console.log("Ddd" + JSON.stringify(await searchPlace("Dhaka"), null, 2));
    const catergories = `${selectedCategoryOfPlace}`;
    places = await getPlaces(catergories, locationName);
  }
</script>

<div class="flex h-screen w-screen">
  <div class="flex flex-col w-5/6 md:my-20 md:mx-20 spacex-10">
    <div>
      <select
        bind:value={selectedCategoryOfPlace}
        class="select select-bordered w-full max-w-xs"
      >
        <option disabled value="">Specify a Type of Place</option>
        <option>Entertainment</option>
        <option>Nature</option>
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
    <div>map here</div>
  </div>
  <div class="flex flex-col items-center justify-center h-full w-1/6">
    {#each places as place}
      <h1>{place.name}</h1>
    {/each}
  </div>
</div>
