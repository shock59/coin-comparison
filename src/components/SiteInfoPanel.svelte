<script lang="ts">
  import currencies from "../currencies";
  import InfoPanel from "./InfoPanel.svelte";

  let { close }: { close: () => void } = $props();
</script>

{#snippet title()}
  About Coin Conversion
{/snippet}

{#snippet content()}
  <p>
    Coin Conversion is a website which allows you to visualise currency
    conversion by showing you the equivalent coins and banknotes of various
    currencies. Currencies are converted using their exchange rates.
  </p>

  <div class="quote">
    <p>
      In finance, an exchange rate is the rate at which one currency will be
      exchanged for another currency. Currencies are most commonly national
      currencies, but may be sub-national as in the case of Hong Kong or
      supra-national as in the case of the euro.
    </p>
    <p>
      The exchange rate is also regarded as the value of one country's currency
      in relation to another currency. For example, an interbank exchange rate
      of 141 Japanese yen to the United States dollar means that ¥141 will be
      exchanged for US$1 or that US$1 will be exchanged for ¥141. In this case
      it is said that the price of a dollar in relation to yen is ¥141, or
      equivalently that the price of a yen in relation to dollars is $1/141.
    </p>
    <p class="level-2">
      Read more on <a
        href="https://en.wikipedia.org/wiki/Exchange_rate"
        target="_blank">Wikipedia</a
      >
    </p>
  </div>

  <p>
    This website sources currency exchange rates from <a
      href="https://finance.yahoo.com/"
      target="_blank">Yahoo Finance</a
    >.
    <span class="disclaimer"
      >Note that exchange rate data is not sourced from all markets and may be
      delayed or slightly inaccurate. Information is provided exclusively for
      informational and entertainment purposes, and should not be used for
      trading purposes or financial advice.</span
    >
  </p>

  <p>
    On this site you can also learn more about various currencies. You can see a
    summary of the currency's Wikipedia article as well as all of the coins and
    banknotes.
  </p>

  <p>The following currencies are currently supported:</p>
  <ul>
    {#each currencies as currency}
      <li>
        <img src={currency.flag} alt="{currency.code} flag" />
        <span>{currency.name}</span>
      </li>
    {/each}
  </ul>

  <div class="line"></div>

  <p>
    Coin Conversion was made by <a href="https://samv.me/" target="_blank"
      >Sam Vuckovic</a
    >, you can view the source code on
    <a href="https://github.com/shock59/coin-comparison" target="_blank"
      >GitHub</a
    >. If you have any suggestions for additional features to include on this
    site, feel free to contact me using the contact details on my website!
  </p>
{/snippet}

<InfoPanel {title} {content} {close} />

<style>
  .quote {
    padding-left: 16px;
    border-left: 2px rgba(255, 255, 255, 0.1) solid;
  }

  .disclaimer {
    color: #ff6464;
  }

  li {
    text-align: start;
  }

  li img {
    height: 20px;
  }

  li img,
  li span {
    vertical-align: middle;
  }
</style>
