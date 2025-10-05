<script lang="ts">
  import { onMount } from "svelte";
  import { type Currency } from "../currencies";

  type JsonSpan = {
    text: string;
    formatting?: string[];
  };
  type ArticleResponse = {
    text: JsonSpan[][];
    href: string;
  };

  let { currency }: { currency: Currency } = $props();
  let article: ArticleResponse | undefined = $state();

  onMount(async () => {
    const response = await fetch(
      `http://127.0.0.1:3000/article/${currency.code}`
    );
    article = (await response.json()) as ArticleResponse;
  });
</script>

<div id="info-panel-container">
  <div id="info-panel">
    <div id="info-title">About the {currency.name}</div>
    <div class="line"></div>

    {#if article}
      {#each article.text as line}
        <p>
          {#each line as span}
            <span class={span.formatting?.join(" ") ?? ""}>{span.text}</span>
          {/each}
        </p>
      {/each}

      <p class="level-2">
        Read more on <a href={article.href}>Wikipedia</a>
      </p>
    {:else}
      <p class="level-2">Loading...</p>
    {/if}
    <div class="line"></div>

    <div id="all-images">
      {#each currency.denominations as denomination}
        <div class="image-container">
          <img
            src="images/{currency.code}/{denomination.value}.png"
            alt="{currency.symbol}{denomination.value.toFixed(
              currency.decimalPlaces
            )}"
          />
          {denomination.name}
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  #info-panel-container {
    display: flex;
    justify-content: center;
    position: fixed;
    width: 100vw;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.65);
    z-index: 1;
    overflow-y: auto;
  }

  #info-panel {
    width: 960px;
    height: fit-content;
    margin: 32px 0;
    padding: 16px;
    background-color: #242424;
    border-radius: 10px;
    font-size: 20px;
  }

  #info-title {
    font-weight: bold;
    font-size: 36px;
  }

  .line {
    margin-top: 8px;
    border-bottom: 2px rgba(255, 255, 255, 0.1) solid;
  }

  p {
    width: 100%;
    text-align: left;
  }

  .level-2 {
    width: fit-content;
    opacity: 0.65;
    transition: 200ms;
  }

  .level-2:hover {
    opacity: 1;
  }

  #all-images {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .image-container {
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 16px 0;
  }

  .image-container img {
    margin-right: 16px;
    height: 100px;
  }

  .bold {
    font-weight: bold;
  }

  .italic {
    font-style: italic;
  }
</style>
