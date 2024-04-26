<script lang="ts">
    import Hero from "./hero.svelte";
import Navbar from "./navbar.svelte";
    export let title: string;
</script>

<div class="w-full h-full">
    <Navbar title={title}/>
    <Hero />
</div>