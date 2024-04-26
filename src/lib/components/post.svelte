<script lang="ts">
  import { ArrowBigDown, ArrowBigUp, Dot } from "lucide-svelte";
  import PocketBase from "pocketbase";

  export let post: any;

  const upVote = async() => {
    try{
        const pb = new PocketBase("https://hackathonbas.pockethost.io");
        let upVote = post.upvote;
        upVote += 1;
        const record = await pb.collection("posts").update(post.id, {
            "upvote": upVote
        });
    } catch(err){
        console.error(err);
    }
  }

  const downVote = async() => {
    try{
        const pb = new PocketBase("https://hackathonbas.pockethost.io");
        let downVote = post.downVote;
        downVote += 1;
        const record = await pb.collection("posts").update(post.id, {
            "downvote": downVote
        });
    } catch(err){
        console.error(err);
    }
  }
</script>

<div class="border-2 flex w-full h-fit rounded-lg shadow-sm p-5 gap-5 items-center">
    <div class="flex flex-col gap-4">
        <div class="flex flex-col items-center justify-center">
            <button on:click={upVote}><ArrowBigUp class="hover:text-success"/></button>
            {post.upvote - post.downvote}
            <button on:click={downVote}><ArrowBigDown class="hover:text-error" on:click={downVote}/></button>
        </div>
    </div>
  <div class="flex flex-col gap-5 rounded-lg p-10">
    <div class="flex flex-col">
        <div class="flex gap-1 items-center">
            <h1 class="text-3xl font-bold">{post.title}</h1>
            <Dot />
            <h1 class="font-bold">{post.name}</h1>
          </div>
          <p class="text-xs">{post.created}</p>
    </div>
    <p class="text-md">{post.description}</p>
    <div class="flex flex-col overflow-x-auto items-center justify-center">
        <table class="table table-lg border-2">
          <!-- head -->
          <thead>
            <tr class="border-2 border-white">
              <th class="border-2 border-white">Source</th>
              <th class="border-2 border-white">Destination</th>
              <th class="border-2 border-white">Budget</th>
              <th class="border-2 border-white">Weather</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-2 border-white">
              <td class="border-2 border-white">{post.source}</td>
              <td class="border-2 border-white">{post.destination}</td>
              <td class="border-2 border-white">{post.budget}</td>
              <td class="border-2 border-white">{post.weather}</td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</div>
