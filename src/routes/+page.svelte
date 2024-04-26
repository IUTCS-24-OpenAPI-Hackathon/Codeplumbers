<script lang="ts">
  import Landing from "$lib/components/landing/landing.svelte";
    export let data: any;
    $: ({appInfo} = data);
</script>

<div class="flex flex-col items-center h-screen w-screen">
    <Landing title={appInfo.title}/>
</div>