<script lang="ts">
  import { MapPin, TramFront, Users } from "lucide-svelte";
  import { page } from "$app/stores";
  let url: any;

    export let data: any;
    $: ({appInfo} = data);
    $: (url = $page.url.pathname);

    function isActive(route: string): boolean {
        return url === route;
    }
</script>

<!-- Navbar -->
<div class="navbar bg-base-100 justify-between pb-10">
    <div>
      <a class="btn btn-ghost text-xl md:text-2xl" href="/">{appInfo.title}</a>
    </div>

    <!-- nav -->
    <div>
        <a href="/app/"><button class="btn btn-ghost hover:text-primary {(isActive("/app/") || isActive("/app")) ? "": ""} flex items-center"> <Users class="w-4 h-4"/> Community </button> </a>
        <a href="/app/places"><button class="btn btn-ghost hover:text-primary {isActive("/app/places")? "": ""} flex items-center"> <MapPin class="w-4 h-4"/> Explore Map </button> </a>
        <a href="/app/Tour/AI"><button class="btn btn-ghost hover:text-primary {isActive("/app/Tour/AI")? "": ""} flex items-center"> <TramFront class="w-4 h-4"/> Plan a Tour</button></a>
    </div>
    <div class="gap-2 ">
        <form action="/auth/logout" method="POST">
            <button type="submit" class="btn btn-primary">logout</button>
        </form>
    </div>
</div>

<slot >

</slot>