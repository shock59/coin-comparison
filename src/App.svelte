<script lang="ts">
  import CoinDisplay from "./components/CoinDisplay.svelte";
  import ConversionForm from "./components/ConversionForm.svelte";
  import type { Currency } from "./currencies";
  import currencies from "./currencies";

  let fromCurrency: Currency = $state(currencies[0]);
  let toCurrency: Currency = $state(currencies[0]);
  let fromAmount: number | undefined = $state();
  let toAmount: number | undefined = $state();

  function countDecimals(num: number) {
    if (Math.floor(num) === num) return 0;
    return num.toString().split(".")[1].length || 0;
  }

  function decideDecimalPlaces() {
    if (Math.max(fromAmount ?? 0, toAmount ?? 0) > 10) {
      return 0;
    }
    return Math.max(
      countDecimals(fromAmount ?? 0),
      countDecimals(toAmount ?? 0)
    );
  }
</script>

<main>
  <div class="row" id="header-row">
    <div class="grow">
      {fromCurrency.symbol}{fromAmount?.toFixed(fromCurrency.decimalPlaces) ??
        "..."}
    </div>
    <div class="center-column">≈</div>
    <div class="grow">
      {toCurrency.symbol}{toAmount?.toFixed(toCurrency.decimalPlaces) ?? "..."}
    </div>
  </div>

  <div class="row grow">
    <CoinDisplay currency={fromCurrency} amount={fromAmount ?? 0} />

    <ConversionForm
      class="center-column"
      bind:fromCurrency
      bind:toCurrency
      bind:fromAmount
      bind:toAmount
    />

    <CoinDisplay currency={toCurrency} amount={toAmount ?? 0} />
  </div>
</main>

<style>
  main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .grow {
    flex-basis: 0;
    flex-grow: 1;
  }

  .center-column {
    width: 445px;
  }

  #header-row {
    padding: 16px 0;
    font-size: 64px;
    text-align: center;
    align-items: center;
  }

  #header-row .center-column {
    color: rgba(255, 255, 255, 0.66);
    font-size: 48px;
  }
</style>
