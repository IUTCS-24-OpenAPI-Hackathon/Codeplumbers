<script lang="ts">
    export let data: any;
    $: ({appData} = data);
</script>

<div class="flex items-center justify-center h-screen w-screen">
    <p> Hello {appData.user.name} and Welcome to the App</p>
</div>