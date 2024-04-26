<script lang="ts">
    import { BookOpen, Compass, Component, Menu } from "lucide-svelte";

    export let title: string;
</script>

<div class="navbar bg-base-100 justify-between">
  <div>
    <a class="btn btn-ghost text-xl md:text-2xl" href="/">{title}</a>
  </div>
  <div class="hidden md:block">
    <ul class="flex gap-3">
        <li class="flex btn btn-ghost items-center justify-center gap-1 hover:text-primary"> <BookOpen class="w-4 h-4"/> Docs</li>
        <li class="flex btn btn-ghost items-center justify-center gap-1 hover:text-primary"> <Component class="w-4 h-4"/> Components</li>
        <li class="flex btn btn-ghost items-center justify-center gap-1 hover:text-primary"> <Compass class="w-4 h-4"/> Guide</li>
    </ul>
  </div>
  <div class="hidden md:block">
    <a href="/auth/register"><button class="btn btn-primary btn-md">Get Started</button></a>
  </div>
  <div class="md:hidden">
    <details class="dropdown dropdown-end">
        <summary class="btn m-1"> <Menu class="w-4 h-4"/> </summary>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul class="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-52">
            <li><a href="/">Documentation</a></li>
            <li><a href="/">Components</a></li>
            <li><a href="/">Guides</a></li>
            <li><a href="/auth/register">Get Started</a></li>
            <li><a href="/auth/login">Log in</a></li>
        </ul>
    </details>
  </div>
</div>
