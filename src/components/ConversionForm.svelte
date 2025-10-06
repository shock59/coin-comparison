<script lang="ts">
  import { onMount } from "svelte";
  import currencies, { type Currency } from "../currencies";

  let {
    class: className,
    fromCurrency = $bindable(),
    toCurrency = $bindable(),
    fromAmount = $bindable(),
    toAmount = $bindable(),
  }: {
    class: string;
    fromCurrency: Currency;
    toCurrency: Currency;
    fromAmount: number | undefined;
    toAmount: number | undefined;
  } = $props();

  let conversionRate: number = $state(0);

  let fromCurrencyCode: string = $state("AUD");
  let toCurrencyCode: string = $state("EUR");

  let fromAmountDisplay: string = $state("1");
  let toAmountDisplay: string = $state("...");

  function updateCurrenciesFromCodes() {
    fromCurrency = currencies.find((c) => c.code === fromCurrencyCode)!;
    toCurrency = currencies.find((c) => c.code === toCurrencyCode)!;
  }

  function updateAmountDisplays() {
    fromAmountDisplay = fromAmount?.toFixed(6) ?? "...";
    toAmountDisplay = toAmount?.toFixed(6) ?? "...";
  }

  async function updateConversion() {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/convert/${fromCurrency.code}/${toCurrency.code}`
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

  function updateCurrency() {
    updateCurrenciesFromCodes();
    toAmount = undefined;
    updateAmountDisplays();
    updateConversion();
  }

  onMount(() => {
    updateCurrenciesFromCodes();
    fromAmount = Number(fromAmountDisplay);
    updateAmountDisplays();
    updateConversion();
  });
</script>

<div id="conversion-form" class={className}>
  <div class="input-row">
    <input
      type="text"
      bind:value={fromAmountDisplay}
      onchange={updateToAmount}
    />
    <select bind:value={fromCurrencyCode} onchange={updateCurrency}>
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
    <select bind:value={toCurrencyCode} onchange={updateCurrency}>
      {#each currencies as currency}
        <option value={currency.code}>{currency.name}</option>
      {/each}
    </select>
  </div>
</div>

<style>
  #conversion-form {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

  option {
    background-color: #141414;
  }

  #arrow {
    margin: 8px 0;
    color: rgba(255, 255, 255, 0.2);
  }
</style>
