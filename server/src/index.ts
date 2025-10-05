import express from "express";
import yahooFinance from "yahoo-finance2";
import cors from "cors";
import * as cheerio from "cheerio";

type WikipediaExtractsResponse = {
  query: {
    pages: {
      [K in string]: {
        extract: string;
      };
    };
  };
};
type JsonSpan = {
  text: string;
  formatting?: string[];
};
type ArticleResponse = {
  text: JsonSpan[][];
  href: string;
};

const port = 3000;
const validCurrencies = ["AUD", "EUR", "GBP", "USD", "VND"];
const currencyWikiArticles: Record<string, string> = {
  AUD: "Australian_dollar",
  EUR: "Euro",
  GBP: "Pound_sterling",
  USD: "United_States_dollar",
};

const app = express();
app.use(cors());

async function getConversionRate(from: string, to: string) {
  from = from.toUpperCase();
  to = to.toUpperCase();
  if ([from, to].includes("VND")) {
    const vndUsdConversionRate = await yahooFinance.quote(`VND=X`);
    const usdConversionRate = await yahooFinance.quote(
      `${to == "VND" ? from : ""}USD${from == "VND" ? to : ""}=X`
    );
    console.log(vndUsdConversionRate.regularMarketPrice);
    console.log(usdConversionRate.regularMarketPrice);
    if (
      vndUsdConversionRate &&
      vndUsdConversionRate.regularMarketPrice != undefined &&
      usdConversionRate &&
      usdConversionRate.regularMarketPrice != undefined
    ) {
      const conversionRate =
        vndUsdConversionRate.regularMarketPrice *
        usdConversionRate.regularMarketPrice;
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

app.get("/article/:currency", async (req, res) => {
  const currency = req.params.currency.toUpperCase();
  const articleName = currencyWikiArticles[currency];

  if (!Object.keys(currencyWikiArticles).includes(currency)) {
    return res.json({ error: `${currency} is not a valid currency` });
  }
  const wikiResponse = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=1&format=json&titles=${articleName}`
  );
  const json = (await wikiResponse.json()) as WikipediaExtractsResponse;
  const originalHtml = Object.values(json.query.pages)[0]?.extract ?? "";
  const document = cheerio.load(originalHtml);

  let jsonDocument: JsonSpan[][] = [];
  for (let p of document("p")) {
    if (p.type == "tag" && p.attribs.class == "mw-empty-elt") continue;

    let line: JsonSpan[] = p.children
      .map((c) => {
        if (c.type == "text") {
          return { text: c.data };
        } else if (c.type == "tag") {
          const child = c.children[0];
          if (child?.type == "text") {
            return {
              text: child.data,
              formatting: [
                c.name == "b" ? "bold" : "",
                c.name == "i" ? "italic" : "",
              ],
            };
          }
        }
        return { text: "" };
      })
      .map((s) => {
        s.text = s.text.replace("\n", "");
        return s;
      });
    jsonDocument.push(line);
  }

  const response: ArticleResponse = {
    text: jsonDocument,
    href: `https://en.wikipedia.org/wiki/${articleName}`,
  };
  res.json(response);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
