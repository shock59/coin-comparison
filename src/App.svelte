<script lang="ts">
  import { onMount } from "svelte";

  let conversionRate: number = $state(0);

  let fromCurrency: string = $state("aud");
  let toCurrency: string = $state("usd");

  let fromAmountDisplay: string = $state("1");
  let toAmountDisplay: string = $state("");

  let fromAmount: number | undefined = $state(1);
  let toAmount: number | undefined = $state();

  function updateAmountDisplays() {
    fromAmountDisplay = fromAmount?.toFixed(2) ?? "";
    toAmountDisplay = toAmount?.toFixed(2) ?? "";
  }

  async function updateConversion() {
    const response = await fetch(
      `http://localhost:3000/convert/${fromCurrency}/${toCurrency}`
    );
    conversionRate = await response.json();
    console.log("!!!");
    if (fromAmount == undefined) updateFromAmount();
    else updateToAmount();
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

  function updateFromCurrency() {
    toAmount = undefined;
    updateAmountDisplays();
    updateConversion();
  }

  function updateToCurrency() {
    fromAmount = undefined;
    updateAmountDisplays();
    updateConversion();
  }

  onMount(() => {
    fromAmount = Number(fromAmountDisplay);
    updateAmountDisplays();
    updateConversion();
  });
</script>

<main>
  <h1>Coin Comparison</h1>

  <div class="input-row">
    <input
      type="text"
      bind:value={fromAmountDisplay}
      onchange={updateToAmount}
    />
    <select bind:value={fromCurrency} onchange={updateFromCurrency}>
      <option value="aud">Australian dollar</option>
      <option value="eur">Euro</option>
      <option value="gbp">Pound sterling (British pound)</option>
      <option value="usd">US Dollar</option>
    </select>
  </div>

  <div class="input-row">
    <input
      type="text"
      bind:value={toAmountDisplay}
      onchange={updateFromAmount}
    />
    <select bind:value={toCurrency} onchange={updateToCurrency}>
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
    border: 2px rgba(255, 255, 255, 0.2) solid;
    border-radius: 10px;
    padding: 8px;
    color: rgba(255, 255, 255, 0.76);
    font-size: 22px;
    margin-bottom: 8px;
  }

  input,
  select {
    border: none;
    outline: none;
    background: none;
    color: inherit;
    font: inherit;
  }

  input {
    width: 100px;
    border-right: 2px rgba(255, 255, 255, 0.1) solid;
    padding-right: 8px;
  }

  select {
    padding-left: 8px;
  }
</style>
