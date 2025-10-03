<script lang="ts">
  import { onMount } from "svelte";

  let conversionRate: number = $state(0);

  let fromCurrency: string = $state("aud");
  let toCurrency: string = $state("usd");

  let fromAmountDisplay: string = $state("1");
  let toAmountDisplay: string = $state("");

  let fromAmount: number = $state(1);
  let toAmount: number | undefined = $state();

  function updateAmountDisplays() {
    fromAmountDisplay = fromAmount.toFixed(2);
    toAmountDisplay = toAmount?.toFixed(2) ?? "";
  }

  function updateFromAmount() {
    toAmount = Number(toAmountDisplay);
    fromAmount = (toAmount ?? 0) / conversionRate;
    updateAmountDisplays();
  }

  function updateToAmount() {
    fromAmount = Number(fromAmountDisplay);
    toAmount = conversionRate * fromAmount;
    updateAmountDisplays();
  }

  onMount(async () => {
    fromAmount = Number(fromAmountDisplay);
    updateAmountDisplays();
    const response = await fetch(
      `http://localhost:3000/convert/${fromCurrency}/${toCurrency}`
    );
    conversionRate = await response.json();
    updateToAmount();
  });
</script>

<main>
  <h1>Coin Comparison</h1>

  <div class="input-row">
    <input
      type="number"
      bind:value={fromAmountDisplay}
      onchange={updateToAmount}
    />
    <select bind:value={fromCurrency}>
      <option value="aud">Australian dollar</option>
      <option value="eur">Euro</option>
      <option value="gbp">Pound sterling (British pound)</option>
      <option value="usd">US Dollar</option>
    </select>
  </div>

  <div class="input-row">
    <input
      type="number"
      bind:value={toAmountDisplay}
      onchange={updateFromAmount}
    />
    <select bind:value={toCurrency}>
      <option value="aud">Australian dollar</option>
      <option value="eur">Euro</option>
      <option value="gbp">Pound sterling (British pound)</option>
      <option value="usd">US Dollar</option>
    </select>
  </div>
</main>

<style>
  main {
    width: 100%;
  }

  .input-row {
    display: flex;
    flex-direction: row;
  }
</style>
