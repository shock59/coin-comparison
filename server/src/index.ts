import express from "express";
import yahooFinance from "yahoo-finance2";
import cors from "cors";

const port = 3000;
const validCurrencies = ["AUD", "EUR", "GBP", "USD", "VND"];

const app = express();
app.use(cors());

async function getConversionRate(from: string, to: string) {
  from = from.toUpperCase();
  to = to.toUpperCase();
  if ([from, to].includes("VND")) {
    const vndUsdConversionRate = await yahooFinance.quote(`VND=X`);
    const usdToConversionRate = await yahooFinance.quote(`USD${to}=X`);
    if (
      vndUsdConversionRate &&
      vndUsdConversionRate.regularMarketPrice != undefined &&
      usdToConversionRate &&
      usdToConversionRate.regularMarketPrice != undefined
    ) {
      const conversionRate =
        vndUsdConversionRate.regularMarketPrice *
        usdToConversionRate.regularMarketPrice;
      return conversionRate;
    } else {
      return { error: "Failed currency conversion" };
    }
  }

  const conversionRate = await yahooFinance.quote(`${from}${to}=X`);
  if (conversionRate && conversionRate.regularMarketPrice != undefined) {
    return conversionRate.regularMarketPrice;
  } else {
    return { error: "Failed currency conversion" };
  }
}

app.get("/convert/:from/:to", async (req, res) => {
  for (const currency of Object.values(req.params)) {
    const upperCurrency = currency.toUpperCase();
    if (!validCurrencies.includes(upperCurrency)) {
      return res.json({ error: `${upperCurrency} is not a valid currency` });
    }
  }

  if (req.params.from.toUpperCase() == req.params.to.toUpperCase()) {
    return res.json(1);
  }

  const conversionRate = await getConversionRate(
    req.params.from,
    req.params.to
  );
  res.json(conversionRate);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
