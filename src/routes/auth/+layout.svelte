<script lang="ts">
    export let data: any;
    $: ({appInfo} = data);
</script>

<!-- Navbar -->
<div class="navbar bg-base-100 justify-between">
  <div>
    <a class="btn btn-ghost text-xl md:text-2xl" href="/">{appInfo.title}</a>
  </div>
</div>

<div class="flex h-screen w-screen mt-20 md:mt-36 justify-center">
    <slot />
</div>