<script lang="ts">
    import { onMount } from "svelte";
    import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
    import Hero from "$lib/components/landing/hero.svelte";
    import Landing from "$lib/components/landing/landing.svelte";
    import Layout from "../+layout.svelte";
    import Map from "../places/map.svelte";
    import { text } from "@sveltejs/kit";

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

    let generatedPrompt: string = "";
    let finalText : string = "No Suggestions";
    async function generateContent() {
        // Construct the prompt string using user input
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
        console.log("Generated content:", text);
    }

    function handleSubmit() {
        // Handle form submission here
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

<main class="container mx-auto p-6 h-screen">
    <h1 class="text-2xl flex justify-center mb-4">
        Give Your Requirement to get Perfect Tour Spot
    </h1>
    <div class="flex">
        <form on:submit|preventDefault={handleSubmit} class="flex w-1/4">
            <div class="space-y-4">
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
                    <input
                        type="text"
                        placeholder="Transport Option"
                        class="input input-bordered input-info w-full max-w-xs"
                        bind:value={transportOption}
                    />
                </label>

                <label class="block">
                    <input
                        type="text"
                        placeholder="Nature of Tour"
                        class="input input-bordered input-info w-full max-w-xs"
                        bind:value={tourNature}
                    />
                </label>

                <button
                    type="submit"
                    class="btn btn-primary"
                    on:click={generateContent}>Get Suggetion</button
                >
            </div>
        </form>
        <div id="right" class="w-3/4">{finalText}</div>
    </div>
</main>
