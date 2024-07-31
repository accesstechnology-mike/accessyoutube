<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import Search from '$lib/components/Search.svelte';

    export let data;

    let links = [];
    let v = $page.params.query;

    $: {
        if (data.results) {
            links = data.results.slice(0, 12).map((item, index) => ({
                vidId: item.id,
                title: item.title,
                thumb: `https://img.youtube.com/vi/${item.id}/hqdefault.jpg`,
                accesskey: index < 9 ? (index + 1).toString() : index === 9 ? '0' : index === 10 ? 'a' : 'b'
            }));
        }
    }

    function handleVideoClick(index: number) {
        sessionStorage.setItem('searchResults', JSON.stringify(links));
        sessionStorage.setItem('currentVideoIndex', index.toString());
        goto(`/play/${links[index].vidId}`);
    }
</script>

<Search />

<div class="container mx-auto px-4">
    <div class="text-center mb-8">
        <h1 class="text-3xl font-bold">Search Results</h1>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {#each links as link, index}
            <div class="column">
                <div class="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 focus-within:ring-2 focus-within:ring-blue-500">
                    <div class="relative">
                        <button on:click={() => handleVideoClick(index)} class="block w-full text-left">
                            <img src="{link.thumb}" alt="{link.title}" class="w-full h-48 object-cover" />
                            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <h2 class="text-white text-lg font-semibold px-4 text-center">{link.title}</h2>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>