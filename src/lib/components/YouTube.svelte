<script>
    import { onMount } from 'svelte';

    export let player;
    export let initialVideoId = '';
    const ytPlayerId = 'youtube-player';

    onMount(() => {
        const load = () => {
            player = new YT.Player(ytPlayerId, {
                height: '100%',
                width: '100%',
                videoId: initialVideoId,
                playerVars: { autoplay: 1 }
            });
        };

        window.YT ? load() : (window.onYouTubeIframeAPIReady = load);
    });
</script>

<svelte:head>
    <script src="https://www.youtube.com/iframe_api"></script>
</svelte:head>

<div id={ytPlayerId} />