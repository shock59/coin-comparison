<script lang="ts">
  import { onMount } from "svelte";
  import currencies from "../currencies";

  let conversionRate: number = $state(0);

  let fromCurrency: string = $state("AUD");
  let toCurrency: string = $state("USD");

  let fromAmountDisplay: string = $state("1");
  let toAmountDisplay: string = $state("...");

  let fromAmount: number | undefined = $state(1);
  let toAmount: number | undefined = $state();

  function updateAmountDisplays() {
    fromAmountDisplay = fromAmount?.toFixed(6) ?? "...";
    toAmountDisplay = toAmount?.toFixed(6) ?? "...";
  }

  async function updateConversion() {
    const response = await fetch(
      `http://localhost:3000/convert/${fromCurrency}/${toCurrency}`
    );
    conversionRate = await response.json();
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

<div id="conversion-form">
  <div class="input-row">
    <input
      type="text"
      bind:value={fromAmountDisplay}
      onchange={updateToAmount}
    />
    <select bind:value={fromCurrency} onchange={updateFromCurrency}>
      {#each currencies as currency}
        <option value={currency.code}>{currency.name}</option>
      {/each}
    </select>
  </div>

  <div id="arrow">↕</div>

  <div class="input-row">
    <input
      type="text"
      bind:value={toAmountDisplay}
      onchange={updateFromAmount}
    />
    <select bind:value={toCurrency} onchange={updateToCurrency}>
      {#each currencies as currency}
        <option value={currency.code}>{currency.name}</option>
      {/each}
    </select>
  </div>
</div>

<style>
  #conversion-form {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 32px;
    font-size: 22px;
  }

  .input-row {
    display: flex;
    flex-direction: row;
    border: 2px rgba(255, 255, 255, 0.2) solid;
    border-radius: 10px;
    padding: 8px;
    color: rgba(255, 255, 255, 0.76);
  }

  input,
  select {
    border: none;
    outline: none;
    background: none;
    font: inherit;
  }

  input {
    width: 180px;
    border-right: 2px rgba(255, 255, 255, 0.1) solid;
    padding-right: 8px;
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.76) 0%,
      rgba(255, 255, 255, 0.76) 40%,
      rgba(255, 255, 255, 0.1) 100%
    );
    color: transparent;
    background-clip: text;
    text-align: right;
  }

  input:focus {
    color: inherit;
  }

  select {
    padding-left: 8px;
    color: inherit;
  }

  #arrow {
    margin: 8px 0;
    color: rgba(255, 255, 255, 0.2);
  }
</style>
