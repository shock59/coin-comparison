# Coin Comparison

Coin Comparison is a website which allows you to visualise currency conversion by showing you the equivalent coins and banknotes of various currencies. Currencies are converted using their exchange rates.

Try it out now at [coincomparison.samv.me](https://coincomparison.samv.me/)!

> In finance, an exchange rate is the rate at which one currency will be exchanged for another currency. Currencies are most commonly national currencies, but may be sub-national as in the case of Hong Kong or supra-national as in the case of the euro.
>
> The exchange rate is also regarded as the value of one country's currency in relation to another currency. For example, an interbank exchange rate of 141 Japanese yen to the United States dollar means that ¥141 will be exchanged for US$1 or that US$1 will be exchanged for ¥141. In this case it is said that the price of a dollar in relation to yen is ¥141, or equivalently that the price of a yen in relation to dollars is $1/141.
>
> \- From [Wikipedia - Exchange rate](https://en.wikipedia.org/wiki/Exchange_rate)

This website sources currency exchange rates from [Yahoo Finance](https://finance.yahoo.com/).
> [!CAUTION]
> Exchange rate data is not sourced from all markets and may be delayed or slightly inaccurate. Information is provided exclusively for informational and entertainment purposes, and should not be used for trading purposes or financial advice.

On this site you can also learn more about various currencies. You can see a summary of the currency's Wikipedia article as well as all of the coins and banknotes.

The following currencies are currently supported:

* 🇦🇺 Australian dollar
* 🇪🇺 Euro
* 🇯🇵 Japanese yen
* 🇬🇧 Pound sterling (British pound)
* 🇨🇭 Swiss franc
* 🇺🇸 US dollar
* 🇻🇳 Vietnamese dong


## Technical details

Coin Comparison is made up of two parts - a Svelte based frontend as well as an express based server that can be found in the `server` directory. You will need to install and run both of these if you want to host Coin Comparison yourself. The server will serve all files in the `server/public` directory, so you can put the built Svelte project in there to serve it for convenience if you wish. Alternatively you can host the frontend and backend on different servers.

You will also need to set up a .env file in both the main directory (for the frontend) and the server directory. The main .env file should contain a value for `VITE_API_URL` which will be the URL of the API server (e.g. `http://127.0.0.1:3000`). The server .env file should contain a value for `SERVER_PORT`, the port the server will run on.