<script>
import '../app.css';
import { browser } from '$app/environment';
import { onMount } from 'svelte';
import { writable } from 'svelte/store';

function getInitialMode() {
  if (!browser) return false;
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return storedTheme === 'dark' || (!storedTheme && prefersDark);
}

export const isDarkMode = writable(getInitialMode());

function toggleMode() {
  isDarkMode.update(value => {
    const newValue = !value;
    if (browser) {
      localStorage.setItem('theme', newValue ? 'dark' : 'light');
    }
    return newValue;
  });
}

$: if (browser) {
  document.documentElement.classList.toggle('dark', $isDarkMode);
}

let mounted = false;
$: if (browser && !mounted) {
  mounted = true;
}
</script>

<svelte:head>
  {@html `
    <script>
      (function() {
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
          document.documentElement.classList.add('dark');
        }
      })();
    </script>
  `}
</svelte:head>

<div class="min-h-screen transition-colors duration-300 bg-[#f7f5f8] dark:bg-[#2e1433] text-[#2e1433] dark:text-[#f7f5f8]">
  <slot />

  {#if mounted}
    <button
      class="fixed top-4 right-4 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-2 rounded"
      on:click={toggleMode}
    >
      Toggle {$isDarkMode ? 'Light' : 'Dark'} Mode
    </button>
  {/if}
</div>

<style>
  :global(body) {
    transition: background-color 0.3s ease, color 0.3s ease;
  }
</style>