<script lang="ts">
  import Post from "$lib/components/post.svelte";
  import { CirclePlus } from "lucide-svelte";
  import avatar from "../../assets/avatar.svg";
  import PocketBase from "pocketbase";
  export let data: any;
  let isTrending = true;
  let modal: any;
  let postDesc: string;
  let postTitle: string;
  let source: string;
  let destination: string;
  let budget: number;
  let transportation: string;
  let weather: string;
  // let media: any;

  const setIsTrending = () => {
    isTrending = true;
  };

  const unsetIsTrending = () => {
    isTrending = false;
  };

  const addPost = async() => {
    try{
      const pb = new PocketBase("https://hackathonbas.pockethost.io");
      const record = await pb.collection("posts").create({
        "title": postTitle,
        "description": postDesc,
        "poster": appData.user.id,
        "name": appData.user.name,
        "source": source, 
        "destination": destination,
        "budget": budget,
        "transportation": transportation,
        "weather": weather
      });
      console.log("Whadda");
      modal.close();
    }catch(err){
      console.error("Could not add post: ", err);
    }
  }

  $: ({ appData, trendingPosts, userPosts } = data);
</script>

<div class="flex flex-row items-center justify-left h-screen w-full gap-4">
  <div class="flex w-1/4 shadow-md h-full p-10">
    <div class="flex flex-grow m-2"></div>
    <div
      class="flex flex-col shadow-lg shadow-secondary h-fit rounded-xl p-5 flex-shrink items-center gap-2 m-2 w-1/2"
    >
      <div>
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img src={avatar} alt="Profile Picture" class="w-full" />
      </div>
      <h1 class="text-xl font-bold">
        {appData.user.name}
      </h1>
      <button class="btn btn-outline btn-neutral btn-sm w-full"
        >Edit Profile</button
      >
    </div>
  </div>
  <div
    class="flex flex-col w-1/2 h-full shadow-lg shadow-primary p-10 rounded-md gap-20 overflow-y-scroll overflow-x-auto"
  >
    <div class="flex justify-between">
      <h1 class="text-3xl font-bold">Tour Forum</h1>
      <div class="flex items-center justify-center gap-2">
        <button
          type="submit"
          class="btn {isTrending ? 'btn-active' : 'btn-neutral'}"
          on:click={setIsTrending}>Trending</button
        >
        <button
          type="submit"
          class="btn {isTrending ? 'btn-neutral' : 'btn-active'}"
          on:click={unsetIsTrending}>My Tours</button
        >
      </div>
    </div>
    <div class="flex flex-col flex-grow gap-2">
      {#if isTrending}
        {#each trendingPosts.items as post}
          <Post {post} />
        {/each}
      {:else}
        <!-- Open the modal using ID.showModal() method -->
        <button class="btn" on:click={modal.showModal()}> <CirclePlus />Add New Tour Review</button>
        <dialog bind:this={modal} class="modal">
          <div class="card w-96 bg-base-100 shadow-xl">
            <!-- <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> -->
            <div class="card-body">
              <input type="text" bind:value={postTitle} class="input input-bordered w-full" placeholder="Title">
              <div class="flex w-full">
                <input type="text" bind:value={source} class="input input-bordered w-1/2" placeholder="Went from">
                <input type="text" bind:value={destination} class="input input-bordered w-1/2" placeholder="Place visited"/>
              </div>
              <input type="text" bind:value={transportation} class="input input-bordered w-full" placeholder="Available transportations"/>
              <div class="flex w-full">
                <input type="text" bind:value={budget} class="input input-bordered w-1/2" placeholder="Total expense in dollars"/>
                <input type="text" bind:value={weather} class="input input-bordered w-1/2" placeholder="Weather condition"/>
              </div>
              <textarea bind:value={postDesc} class="textarea textarea-bordered w-full" placeholder="Write something..."></textarea>
              <input type="file" placeholder="Upload an image" class="input file-input-bordered">
              <button class="btn btn-primary" on:click={addPost}>POST</button>
            </div>
          </div>
        </dialog>
        {#each userPosts.items as post}
          <Post {post} />
        {/each}
      {/if}
    </div>
  </div>
</div>
