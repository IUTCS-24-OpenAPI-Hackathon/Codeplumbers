<script lang="ts">
  import { onMount } from "svelte";
  import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
  import { getWeather } from "$lib";
  let places: any[] = [];
  import * as marked from "marked";
  import { CloudRain, Droplets, ThermometerSun } from "lucide-svelte";
  import Post from "$lib/components/post.svelte";
  import PocketBase from "pocketbase";

  let genAI: GoogleGenerativeAI;
  let model: GenerativeModel;

  onMount(() => {
    genAI = new GoogleGenerativeAI("AIzaSyBDV1ttDHEKWstNFl7aq1NhiWoWfq131-E");
    model = genAI.getGenerativeModel({
      model: "gemini-pro",
    });
  });

  let tourDate: string = "";

  let budget: string = "";
  let distance: string = "";
  let location: string = "";
  let transportOption: string = "";
  let tourNature: string = "";
  let weathers: any;

  function formatDate(dateString: string | number | Date) {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  let htmlText = marked.parse("Tourist spot suggestions");
  let htmlText2 = marked.parse("");
  let generatedPrompt: string = "";
  let finalText: string = "No Suggestions";
  let posts: any[] = [];
  async function generateContent() {
    console.log(weathers);
    weathers = await getWeather("3", location);
    let prompt = `Give tourist spot suggestions based on the parameters:
        tourDate: ${tourDate},
        budget: ${budget} Bangladeshi Taka,
        location: ${location},
        transportOption: ${transportOption},
        tourNature: ${tourNature}`;

    console.log("Prompt: " + prompt);

    // Update the generatedPrompt variable
    generatedPrompt = prompt;

    // Generate content based on the constructed prompt
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    finalText = text;
    htmlText = marked.parse(text);
    // console.log("Generated content:", text);
    generateSuggestion();
  }
  let text2: any;
  let suggestion: any;
  async function generateSuggestion() {
    const pb = new PocketBase("https://hackathonbas.pockethost.io");
    const res = await pb.collection("posts").getList(1, 10);

    posts = res.items;
    let prompt = `Note: You will be given some information about tour plan. Like  Tour budget, distance,  location,  tourDate, transportOption tourNature.
You will suggest some Ecommerce Product Name based on that Tour plan

    Output Format:
    productName : Shoes\n
    Price: 5000 Taka\n
    Website to Purchase: www.something.com\n

    productName: backpack\n
    Price: 70000 Taka\n
    Website to Purchase: www.something.com\n

    productName: Shirt\n
    Price : 500 Taka\n
    Website to Purchase: www.something.com\n

    productName : Pent\n
    Price : 200 Taka\n
    Website to Purchase: www.something.com\n\n

        now Give Suggestion for this: 
        Suggest some  ecommers product based on the parameters:
        tourDate: ${tourDate},
        budget: ${budget} Bangladeshi Taka,
        location: ${location},
        transportOption: ${transportOption},
        tourNature: ${tourNature}

    You can use the following experiences shared by some people:
    ${posts}
    `;
    // Generate content based on the constructed prompt
    const result = await model.generateContent(prompt);
    const response = result.response;
    text2 = response.text();

    htmlText2 = marked.parse(text2);
    // console.log("Generated content:", text2);
  }
  function handleSubmit() {
    console.log({
      budget,
      distance,
      location,
      tourDate,
      transportOption,
      tourNature,
    });
  }
</script>

<div class="flex mx-auto p-6 h-screen overflow-auto gap-5">
  <div class="flex w-1/4 items-center justify-center px-10 ">
    <div class="flex flex-1"></div>
    <form
      on:submit|preventDefault={handleSubmit}
      class="flex flex-shrink w-full"
    >
      <div class="space-y-4 items-center">
        <label class="block">
          <span>Date of Tour:</span>
          <input
            type="date"
            class="input input-bordered input-info w-full max-w-xs"
            bind:value={tourDate}
          />
        </label>

        <label class="block">
          <input
            type="text"
            placeholder="Tour Budget"
            class="input input-bordered input-info w-full max-w-xs"
            bind:value={budget}
          />
        </label>

        <label class="block">
          <input
            type="text"
            placeholder="Maximum Distance"
            class="input input-bordered input-info w-full max-w-xs"
            bind:value={distance}
          />
        </label>

        <label class="block">
          <input
            type="text"
            placeholder="Specific Location"
            class="input input-bordered input-info w-full max-w-xs"
            bind:value={location}
          />
        </label>

        <label class="block">
          <select
            class="select select-bordered w-full max-w-xs"
            bind:value={transportOption}
          >
            <option disabled value="">Transport Options</option>
            <option>Walk</option>
            <option>Car</option>
            <option>Bus</option>
            <option>Rail</option>
            <option>Air</option>
            <option>Water</option>
          </select>
        </label>

        <label class="block">
          <select
            class="select select-bordered w-full max-w-xs"
            bind:value={tourNature}
          >
            <option disabled value="">Nature of Tour</option>
            <option>Family</option>
            <option>Solo</option>
          </select>
        </label>

        <button
          type="submit"
          class="btn w-full p-5 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
          on:click={generateContent}
        >
          Make a Tour Plan
        </button>
      </div>
    </form>
  </div>
  <div class="flex flex-col w-3/4  rounded-lg">
    <div class="flex justify-center w-full h-1/2 p-5 bg-slate-700">
      <div class="flex items-end justify-start w-1/2 font-bold text-2xl">{location}</div>
      <div class="flex items-start justify-end">
        <div class="weather-day p-2 shadow-[0_35px_60px_-15px_rgba(0,0,0)]">
          {#if weathers}
            <!-- {#each weathers.forecast.forecastday as day} -->
              <div
                class="flex flex-col w-full weather-day mb-4 p-2 shadow-[0_35px_60px_-15px_rgba(0,0,0)] gap-2"
              >
                
                <h2>{weathers.forecast.forecastday[0].date}</h2>
                <div class="flex w-full gap-2">
                    <p class="btn"><ThermometerSun /> {weathers.forecast.forecastday[0].day.avgtemp_c}°C</p>
                    <p class="btn"><CloudRain /> {weathers.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
                    <p class="btn"><Droplets /> {weathers.forecast.forecastday[0].day.avghumidity}%</p>
                    <img src={weathers.forecast.forecastday[0].day.condition.icon} alt="Weather Icon" />
                </div>
              </div>
            <!-- {/each} -->
          {:else}
            <p>Select a Location for weather forecast</p>
          {/if}
        </div>
      </div>
    </div>

    <div class="flex w-full h-1/2 p-5">
      <div class=" overflow-y-scroll w-1/2">
        {@html htmlText}
    </div>
      <div class=" overflow-y-scroll w-1/2">
        {#each posts as post}
            <Post post={post}/>
        {/each}
        </div>
    </div>

    <!-- <div id="last" class="w-1/4 p-5">
      
    </div> -->
  </div>
</div>
