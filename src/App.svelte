<script lang="ts">
  import CoinDisplay from "./components/CoinDisplay.svelte";
  import ConversionForm from "./components/ConversionForm.svelte";
  import InfoPanel from "./components/InfoPanel.svelte";
  import type { Currency } from "./currencies";
  import currencies from "./currencies";

  let fromCurrency: Currency = $state(currencies[0]);
  let toCurrency: Currency = $state(currencies[0]);
  let fromAmount: number | undefined = $state();
  let toAmount: number | undefined = $state();

  let infoPanel: Currency | undefined = $state();

  function formatNumberWithCommas(n: string | undefined) {
    return n?.replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? undefined;
  }

  function closeInfoPanel() {
    infoPanel = undefined;
  }
</script>

<main>
  <div class="row text-row" id="header-row">
    <div class="grow">
      {fromCurrency.symbol}{formatNumberWithCommas(
        fromAmount?.toFixed(fromCurrency.decimalPlaces)
      ) ?? "..."}
    </div>
    <div class="center-column">≈</div>
    <div class="grow">
      {toCurrency.symbol}{formatNumberWithCommas(
        toAmount?.toFixed(toCurrency.decimalPlaces)
      ) ?? "..."}
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

  <div class="row text-row" id="footer-row">
    <div class="grow">
      <button onclick={() => (infoPanel = fromCurrency)}
        >Learn more about the {fromCurrency.name}</button
      >
    </div>
    <div class="center-column"></div>
    <div class="grow">
      <button onclick={() => (infoPanel = toCurrency)}
        >Learn more about the {toCurrency.name}</button
      >
    </div>
  </div>

  {#if infoPanel}
    <InfoPanel currency={infoPanel} close={closeInfoPanel} />
  {/if}
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

  .text-row {
    padding: 16px 0;
    text-align: center;
    align-items: center;
  }

  #header-row {
    font-size: 64px;
  }

  #header-row .center-column {
    color: rgba(255, 255, 255, 0.66);
    font-size: 48px;
  }

  #footer-row {
    padding-bottom: 32px;
    font-size: 22px;
  }
</style>
