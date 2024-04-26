<script lang="ts">
    export let data: any;
    $: ({appInfo} = data);
</script>

<!-- Navbar -->
<div class="navbar bg-base-100 justify-between">
    <div>
      <a class="btn btn-ghost text-xl md:text-2xl" href="/">{appInfo.title}</a>
    </div>

    <!-- nav -->
    <div>

    </div>

    <div>
        <form action="/auth/logout" method="POST">
            <button type="submit" class="btn btn-ghost text-primary">logout</button>
        </form>
    </div>
</div>

<slot >

</slot>