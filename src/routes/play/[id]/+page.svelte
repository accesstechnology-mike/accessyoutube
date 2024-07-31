<script lang="ts" context="module">
    declare global {
        interface Window {
            onYouTubeIframeAPIReady: () => void;
        }
    }
</script>

<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import Search from '$lib/components/Search.svelte';
    import YouTube from '$lib/components/YouTube.svelte';

    let player;
    let videoId = $page.params.id;
    let searchResults: any[] = [];
    let currentIndex = 0;

    onMount(() => {
        // Load search results from session storage
        const storedResults = sessionStorage.getItem('searchResults');
        const storedIndex = sessionStorage.getItem('currentVideoIndex');
        if (storedResults) {
            searchResults = JSON.parse(storedResults);
            currentIndex = storedIndex ? parseInt(storedIndex, 10) : 0;
        }
    });

    function togglePlayPause() {
        if (player && player.getPlayerState() === 1) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    }

    function repeatVideo() {
        if (player) {
            player.seekTo(0);
            player.playVideo();
        }
    }

    function nextVideo() {
        if (currentIndex < searchResults.length - 1) {
            currentIndex++;
            sessionStorage.setItem('currentVideoIndex', currentIndex.toString());
            goto(`/play/${searchResults[currentIndex].vidId}`);
        }
    }

    function backToSearch() {
        const lastQuery = sessionStorage.getItem('lastSearchQuery');
        if (lastQuery) {
            goto(`/${lastQuery}`);
        } else {
            goto('/');
        }
    }
</script>

<Search />

<div class="container mx-auto px-4 mt-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="card focus control" on:click={togglePlayPause}>
            <a href="#" accesskey="p" class="block p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <i class="fas fa-play-pause text-2xl mb-2"></i>
                <h2 class="text-lg">Pause / Play</h2>
            </a>
        </div>
        <div class="card focus control" on:click={repeatVideo}>
            <a href="#" accesskey="r" class="block p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <i class="fas fa-redo text-2xl mb-2"></i>
                <h2 class="text-lg">Repeat video</h2>
            </a>
        </div>
        <div class="card focus control" on:click={nextVideo}>
            <a href="#" accesskey="n" class="block p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <i class="fas fa-step-forward text-2xl mb-2"></i>
                <h2 class="text-lg">Next video</h2>
            </a>
        </div>
        <div class="card focus control" on:click={backToSearch}>
            <a href="#" accesskey="b" class="block p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <i class="fas fa-arrow-left text-2xl mb-2"></i>
                <h2 class="text-lg">Back to search results</h2>
            </a>
        </div>
    </div>

    <div class="videoWrapper aspect-w-16 aspect-h-9">
        <YouTube bind:player initialVideoId={videoId} />
 
    </div>
</div>

<style>
    .videoWrapper {
        position: relative;
        padding-bottom: 56.25%; /* 16:9 aspect ratio */
        height: 0;
        overflow: hidden;
    }
    
    .videoWrapper :global(iframe) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>