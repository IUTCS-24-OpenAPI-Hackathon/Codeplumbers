<script lang="ts">
    import { onMount } from "svelte";
    import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
    import { getWeather } from "$lib";
    let places: any[] = [];
    import * as marked from "marked";

    let genAI: GoogleGenerativeAI;
    let model: GenerativeModel;

    onMount(() => {
        genAI = new GoogleGenerativeAI(
            "AIzaSyBDV1ttDHEKWstNFl7aq1NhiWoWfq131-E",
        );
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
    async function generateContent() {
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

<main class="container mx-auto p-6 h-screen overflow-auto">
    <h1 class="text-3xl flex justify-center mb-4">
        Give Your Requirement to get Perfect Tour Spot
    </h1>
    <div class="flex">
        <form on:submit|preventDefault={handleSubmit} class="flex w-1/4">
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
                        placeholder="Budget in Taka"
                        class="input input-bordered input-info w-full max-w-xs"
                        bind:value={budget}
                    />
                </label>

                <label class="block">
                    <input
                        type="text"
                        placeholder="Distance Constraints in KM"
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
                        class="select select-info w-full max-w-xs text-red"
                        bind:value={transportOption}
                    >
                        <option disabled selected>Transport Option</option>
                        <option>Car</option>
                        <option>Air</option>
                        <option>Water</option>
                        <option>Rail</option>
                        <option>Bus</option>
                    </select>
                </label>

                <label class="block">
                    <select
                        class="select select-info w-full max-w-xs"
                        bind:value={tourNature}
                    >
                        <option disabled selected>Nature of Tour</option>
                        <option>Family</option>
                        <option>Solo</option>
                    </select>
                </label>

                <button
                    type="submit"
                    class="btn w-full p-5 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                    on:click={generateContent}
                >
                    Get Suggetion From AI
                </button>
            </div>
        </form>
        <div id="right" class="w-1/2 px-4 h-full overflow-scroll">
            <div class="mb-4">{@html htmlText}</div>
        </div>

        <div id="last" class="w-1/4 p-5">
            {#if weathers}
                <p>Weather forecast for {location}</p>
                {#each weathers.forecast.forecastday as day}
                    <div
                        class="weather-day mb-4 p-2 shadow-[0_35px_60px_-15px_rgba(0,0,0)]"
                    >
                        <h2>{formatDate(day.date)}</h2>
                        <p>Average Temperature: {day.day.avgtemp_c}°C</p>
                        <p>Chance of Rain: {day.day.daily_chance_of_rain}%</p>
                        <p>Humidity: {day.day.avghumidity}%</p>
                        <img src={day.day.condition.icon} alt="Weather Icon" />
                    </div>
                {/each}
            {:else}
                <p>Select a Location for weather forecast</p>
            {/if}
        </div>
    </div>
</main>
