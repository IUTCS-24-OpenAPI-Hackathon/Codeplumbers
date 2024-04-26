<script lang="ts">
    import { getPlaces, searchPlace } from "$lib";
    let places: any[] = [];

    let tourDate: string = "";
    let budget: string = "";
    let distance: string = "";
    let locationName = "";
    let transportOption: string = "";
    let tourNature: string = "";

    async function query() {
        places = await getPlaces("Tourism", locationName);
    }
</script>

<div class="flex h-screen w-screen overflow-scroll gap-2">
    <div class="w-1/4 md:my-20 md:mx-20 h-full gap-2">
        <div class = "flex flex-col space-y-4">
            <input
                bind:value={locationName}
                class="input input-bordered p-5"
                placeholder="Give a Location..."
            />
            <span>Date of Tour:</span>
            <input
                type="date"
                class="input input-bordered input-info w-full max-w-xs"
                bind:value={tourDate}
            />

            <input
                type="text"
                placeholder="Budget in Taka"
                class="input input-bordered input-info w-full max-w-xs"
                bind:value={budget}
            />

            <input
                type="text"
                placeholder="Distance Constraints in KM"
                class="input input-bordered input-info w-full max-w-xs"
                bind:value={distance}
            />

            <input
                type="text"
                placeholder="Transport Option"
                class="input input-bordered input-info w-full max-w-xs"
                bind:value={transportOption}
            />

            <input
                type="text"
                placeholder="Nature of Tour"
                class="input input-bordered input-info w-full max-w-xs"
                bind:value={tourNature}
            />
            <button class="btn btn-secondary" on:click={query}>Search</button>
        </div>
    </div>
    <ul
        class="hidden md:flex flex-col menu bg-base-200 w-3/4 h-full rounded-box overflow-y-scroll overflow-x-hidden"
    >
        <h1 class="text-3xl p-5">Places</h1>
        {#each places as place}
            <li class="btn btn-ghost p-3 text-left">{place.name}</li>
        {/each}
    </ul>
    <!-- <div> {JSON.stringify(places)}</div> -->
</div>
