import express from "express";
import yahooFinance from "yahoo-finance2";
import cors from "cors";

const port = 3000;
const validCurrencies = ["AUD", "EUR", "GBP", "USD"];

const app = express();
app.use(cors());

app.get("/convert/:in/:out", async (req, res) => {
  console.log(Object.values(req.params));
  for (const currency of Object.values(req.params)) {
    const upperCurrency = currency.toUpperCase();
    if (!validCurrencies.includes(upperCurrency)) {
      return res.json({ error: `${upperCurrency} is not a valid currency` });
    }
  }

  const results = await yahooFinance.quote(
    `${req.params.in}${req.params.out}=X`
  );

  res.json(results.regularMarketPrice);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
