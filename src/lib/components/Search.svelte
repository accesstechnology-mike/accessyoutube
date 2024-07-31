<!-- src/lib/components/Search.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  
  export let isFrontPage = false;
  
  let query = $page.params.query || '';

  function handleSubmit(event: Event) {
    event.preventDefault();
    if (query.trim()) {
      window.location.href = `/${encodeURIComponent(query.trim())}`;
    }
  }
</script>

<form on:submit={handleSubmit} class={`flex items-center ${isFrontPage ? 'max-w-3xl mx-auto' : 'max-w-xl'}`}>
  {#if !isFrontPage}
    <div class="mr-4 w-10">
      <img src="/img/logo.png" alt="access: youtube, provided by access: technology" class="w-full">
    </div>
  {/if}
  
  <div class="flex-grow relative">
    <input 
      type="text" 
      bind:value={query}
      placeholder="Type here" 
      class={`w-full border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isFrontPage ? 'text-xl py-3 px-4' : 'text-base py-2 px-3'}`}
      autofocus 
      autocomplete="off"
    >
  </div>
  
  <button 
    type="submit" 
    class={`bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isFrontPage ? 'text-xl py-3 px-6' : 'text-base py-2 px-4'}`}
  >
    Search
  </button>
</form>
