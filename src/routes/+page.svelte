<script>
  import Search from '$lib/components/Search.svelte';
</script>

<div class="container mx-auto pt-20">
  <div class="flex justify-center mb-8">
    <img src="/logo-dark.png" alt="Logo" class="block dark:hidden h-16 w-auto">
    <img src="/logo-light.png" alt="Logo" class="hidden dark:block h-16 w-auto">
  </div>
  <Search isFrontPage={true} />
</div>

<style>
  img {
    transition: opacity 0.3s ease-in-out;
  }
</style>