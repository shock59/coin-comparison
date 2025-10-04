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
    const denominations = currency.images.toSorted((a, b) => b - a);
    let images: CoinImage[] = [];
    for (let denomination of denominations) {
      console.log(`Denomination: ${denomination}`);
      console.log(`Amount: ${amount}`);
      console.log(`Images: ${images}`);
      while (amount >= denomination) {
        amount -= denomination;
        images.push({ name: denomination });
      }
    }

    if (amount > 0) {
      const lowestDenomination = denominations[denominations.length - 1];
      images.push({
        name: lowestDenomination,
        coverPercentage: 100 - (amount / lowestDenomination) * 100,
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

  .coin-display img {
    object-fit: contain;
    height: 140px;
    margin: 16px;
  }

  .cover {
    background: #242424;
    position: relative;
    top: -50%;
    height: 150px;
  }
</style>
