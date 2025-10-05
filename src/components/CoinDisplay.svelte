<script lang="ts">
  import { type Currency } from "../currencies";

  type CoinImage = {
    name: number;
    coverPercentage?: number;
  };

  let {
    currency = $bindable(),
    amount = $bindable(),
  }: {
    currency: Currency;
    amount: number;
  } = $props();

  function decideCoinImages(currency: Currency, amount: number) {
    const denominations = currency.denominations.toSorted(
      (a, b) => b.value - a.value
    );
    let images: CoinImage[] = [];
    amount *= 10 ** 6;
    for (let denomination of denominations) {
      while (amount >= denomination.value * 10 ** 6) {
        amount -= denomination.value * 10 ** 6;
        images.push({ name: denomination.value });
      }
    }

    if (amount > 0) {
      const lowestDenomination = denominations[denominations.length - 1];
      images.push({
        name: lowestDenomination.value,
        coverPercentage: 100 - (amount / lowestDenomination.value) * 100,
      });
    }

    return images;
  }
</script>

<div class="coin-display">
  {#key amount}
    {#each (() => decideCoinImages(currency, amount ?? 0))() as image}
      <div>
        <img
          src="images/{currency.code}/{image.name}.png"
          alt="{currency.symbol}{image.name.toFixed(currency.decimalPlaces)}"
        />

        {#if image.coverPercentage}
          <div
            class="cover"
            style="width: {image.coverPercentage}%; left: {100 -
              image.coverPercentage}%"
          ></div>
        {/if}
      </div>
    {/each}
  {/key}
</div>

<style>
  .coin-display {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    flex-basis: 0;
    flex-grow: 1;
  }

  .coin-display > div {
    height: calc(140px + (16px * 2));
  }

  .coin-display img {
    object-fit: contain;
    height: 140px;
    margin: 16px;
  }

  .cover {
    background: #242424;
    position: relative;
    bottom: 166px;
    height: 150px;
  }
</style>
