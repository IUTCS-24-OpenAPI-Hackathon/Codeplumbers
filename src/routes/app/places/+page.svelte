<script lang="ts">
  import { getLocation } from "$lib/utils";
  let places: any[] = [];
  async function getPlaces() {
    const response = await fetch(
      "https://api.geoapify.com/v2/places?categories=commercial,entertainment.culture&filter=rect:90.34358338852036,23.907219375419032,90.44181661148184,23.827158625602067&lang=en&limit=20&apiKey=37b56c71535b48da909b01dc2bfec8b2"
    );
    const respo = await response.json();
    // console.log(respo.features);
    let placess: any[] = [];
    respo.features.forEach((feature: any) => {
      placess.push({ 
        name: feature.properties.name
    });
      // console.log(feature.properties.name);
    });
    console.log(placess);
    places = placess;
  }
</script>

<div class="flex h-screen w-screen">
  <div class="flex flex-col w-5/6 md:my-20 md:mx-20 spacex-10">
    <div>
      <select class="select select-bordered w-full max-w-xs">
        <option disabled selected>Specify a Type of Place</option>
        <option>Entertainment</option>
        <option>Park</option>
        <option>Museum</option>
      </select>
      <select class="select select-bordered w-full max-w-xs">
        <option disabled selected>none</option>
        <option>Your Location</option>
        <option>Park</option>
        <option>Museum</option>
      </select>
      <button class="btn btn-secondary" on:click={getPlaces}>Search</button>
    </div>
    <div>map here</div>
  </div>
  <div class="flex flex-col items-center justify-center h-full w-1/6">
    {#each places as place}
      <h1>{place.name}</h1>
    {/each}
  </div>
</div>
