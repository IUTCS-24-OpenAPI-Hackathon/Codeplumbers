<script lang="ts">
    import { ArrowRight } from "lucide-svelte";
</script>

<div class="flex flex-col-reverse md:flex-row w-full p-5">
    <div class="md:w-1/2 md:mt-80 md:px-20 md:text-left text-center space-y-5">
        <div class="space-y-2">
            <h1 class="text-4xl">
                Welcome to the OpenSource SvelteKit Hackathon Template
            </h1>
            <p>
                Use this BoylerPlate in your hackathon
            </p>
        </div>
        <div class="gap-2">
            <a href="/auth/register"><button class="btn btn-primary btn-md">Get Started</button></a>
            <a href="/auth/login"><button class="btn btn-neutral btn-md">Sign in <ArrowRight class="w-4 h-4" /> </button></a>
        </div>
    </div>
    <div class="md:w-1/2 flex items-center justify-center">
        
    </div>
</div>