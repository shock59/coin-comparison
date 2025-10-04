<div id="info-panel-container">
  <div id="info-panel">
    <div id="info-title">About the Australian Dollar</div>
    <div class="line"></div>

    <p>
      The Australian dollar (sign: $; code: AUD; also abbreviated A$ or
      sometimes AU$ to distinguish it from other dollar-denominated currencies;
      and also referred to as the dollar or Aussie dollar) is the official
      currency and legal tender of Australia, including all of its external
      territories, and three independent sovereign Pacific Island states:
      Kiribati, Nauru, and Tuvalu. In April 2022, it was the sixth most-traded
      currency in the foreign exchange market and as of Q1 2024 the sixth
      most-held reserve currency in global reserves.
    </p>
    <p>
      The Australian dollar was introduced as a decimal currency on 14 February
      1966 to replace the non-decimal Australian pound, with the conversion rate
      of two dollars to the pound (£A1 = A$2). It is subdivided into 100 cents.
      The $ symbol precedes the amount. On the introduction of the currency, the
      $ symbol was intended to have two strokes, but the version with one stroke
      has also always been acceptable.
    </p>
    <p>
      In 2023, there were A$4.4 billion in coins and A$101.3 billion in notes of
      Australian currency in circulation, or around A$6,700 per person in
      Australia, which includes cash reserves held by the banking system and
      cash in circulation in other countries or held as a foreign exchange
      reserve.
    </p>
    <p class="level-2">
      Read more on <a href="https://en.wikipedia.org/wiki/Australian_dollar"
        >Wikipedia</a
      >
    </p>
    <div class="line"></div>

    <div id="all-images">
      <div class="image-container">
        <img src="images/AUD/0.05.png" alt="A$0.05" />
        Five cent coin
      </div>

      <div class="image-container">
        <img src="images/AUD/0.1.png" alt="A$0.10" />
        Ten cent coin
      </div>

      <div class="image-container">
        <img src="images/AUD/0.2.png" alt="A$0.20" />
        Twenty cent coin
      </div>

      <div class="image-container">
        <img src="images/AUD/0.5.png" alt="A$0.50" />
        Fifty cent coin
      </div>

      <div class="image-container">
        <img src="images/AUD/1.png" alt="A$1.00" />
        One dollar coin
      </div>

      <div class="image-container">
        <img src="images/AUD/2.png" alt="A$2.00" />
        Two dollar coin
      </div>

      <div class="image-container">
        <img src="images/AUD/5.png" alt="A$5.00" />
        Five dollar note
      </div>

      <div class="image-container">
        <img src="images/AUD/10.png" alt="A$10.00" />
        10 dollar note
      </div>

      <div class="image-container">
        <img src="images/AUD/20.png" alt="A$20.00" />
        20 dollar note
      </div>

      <div class="image-container">
        <img src="images/AUD/50.png" alt="A$50.00" />
        50 dollar note
      </div>

      <div class="image-container">
        <img src="images/AUD/100.png" alt="A$100.00" />
        100 dollar note
      </div>
    </div>
  </div>
</div>

<style>
  #info-panel-container {
    display: flex;
    justify-content: center;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.65);
    z-index: 1;
    overflow-y: auto;
  }

  #info-panel {
    width: 960px;
    height: fit-content;
    margin: 32px 0;
    padding: 16px;
    background-color: #242424;
    border-radius: 10px;
    font-size: 20px;
  }

  #info-title {
    font-weight: bold;
    font-size: 36px;
  }

  .line {
    margin-top: 8px;
    border-bottom: 2px rgba(255, 255, 255, 0.1) solid;
  }

  p {
    width: 100%;
    text-align: left;
  }

  .level-2 {
    width: fit-content;
    opacity: 0.65;
    transition: 200ms;
  }

  .level-2:hover {
    opacity: 1;
  }

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
