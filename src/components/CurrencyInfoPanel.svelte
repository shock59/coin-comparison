<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { type Currency } from "../currencies";
  import InfoPanel from "./InfoPanel.svelte";

  type JsonSpan = {
    text: string;
    formatting?: string[];
  };
  type ArticleResponse = {
    text: JsonSpan[][];
    href: string;
  };

  let { currency, close }: { currency: Currency; close: () => void } = $props();
  let article: ArticleResponse | undefined = $state();
  let audio: HTMLAudioElement | undefined = $state();

  function playAnthem() {
    audio = new Audio(`/audio/${currency.code}.ogg`);
    audio.volume = 0.4;
    audio.loop = true;
    audio.play();
  }

  onMount(async () => {
    playAnthem();

    const response = await fetch(
      `http://127.0.0.1:3000/article/${currency.code}`
    );
    article = (await response.json()) as ArticleResponse;
  });

  onDestroy(() => {
    audio?.pause();
  });
</script>

{#snippet title()}
  <img src={currency.flag} alt="{currency.code} flag" class="info-title-img" />
  About the {currency.name}
{/snippet}

{#snippet content()}
  {#if article}
    {#each article.text as line}
      <p>
        {#each line as span}
          <span class={span.formatting?.join(" ") ?? ""}>{span.text}</span>
        {/each}
      </p>
    {/each}

    <p class="level-2">
      Read more on <a href={article.href} target="_blank">Wikipedia</a>
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
{/snippet}

<InfoPanel {title} {content} {close} />

<style>
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
</style>
