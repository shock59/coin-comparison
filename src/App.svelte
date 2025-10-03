<script lang="ts">
  import { onMount } from "svelte";

  let results: number | undefined = $state();

  onMount(async () => {
    const response = await fetch("http://localhost:3000/convert/aud/usd");
    const json = (await response.json()) as number;
    results = json;
  });
</script>

<main>
  <h1>Coin Comparison</h1>

  <p>1.00 AUD = {results?.toFixed(2)} USD</p>
</main>

<style>
  main {
    width: 100%;
  }
</style>
