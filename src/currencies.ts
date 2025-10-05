export type Denomination = {
  name: string;
  value: number;
};

export type Currency = {
  name: string;
  code: string;
  symbol: string;
  decimalPlaces: number;
  denominations: Denomination[];
};

const currencies: Currency[] = [
  {
    name: "Australian dollar",
    code: "AUD",
    symbol: "A$",
    decimalPlaces: 2,
    denominations: [
      { name: "Five cent coin", value: 0.05 },
      { name: "Ten cent coin", value: 0.1 },
      { name: "Twenty cent coin", value: 0.2 },
      { name: "Fifty cent coin", value: 0.5 },
      { name: "One dollar coin", value: 1 },
      { name: "Two dollar coin", value: 2 },
      { name: "Five dollar note", value: 5 },
      { name: "10 dollar note", value: 10 },
      { name: "20 dollar note", value: 20 },
      { name: "50 dollar note", value: 50 },
      { name: "100 dollar note", value: 100 },
    ],
  },
  {
    name: "Euro",
    code: "EUR",
    symbol: "€",
    decimalPlaces: 2,
    denominations: [
      { name: "One euro cent coin", value: 0.01 },
      { name: "Two euro cent coin", value: 0.02 },
      { name: "Five euro cent coin", value: 0.05 },
      { name: "Ten euro cent coin", value: 0.1 },
      { name: "Twenty euro cent coin", value: 0.2 },
      { name: "Fifty euro cent coin", value: 0.5 },
      { name: "One euro coin", value: 1 },
      { name: "Two euro coin", value: 2 },
      { name: "Five euro note", value: 5 },
      { name: "10 euro note", value: 10 },
      { name: "20 euro note", value: 20 },
      { name: "50 euro note", value: 50 },
      { name: "100 euro note", value: 100 },
      { name: "200 euro note", value: 200 },
    ],
  },
  {
    name: "Pound sterling (British pound)",
    code: "GBP",
    symbol: "£",
    decimalPlaces: 2,
    denominations: [
      { name: "One penny coin", value: 0.01 },
      { name: "Two pence coin", value: 0.02 },
      { name: "Five pence coin", value: 0.05 },
      { name: "Ten pence coin", value: 0.1 },
      { name: "Twenty pence coin", value: 0.2 },
      { name: "Fifty pence coin", value: 0.5 },
      { name: "One pound coin", value: 1 },
      { name: "Two pound coin", value: 2 },
      { name: "Five pound note", value: 5 },
      { name: "10 pound note", value: 10 },
      { name: "20 pound note", value: 20 },
      { name: "50 pound note", value: 50 },
    ],
  },
  {
    name: "US dollar",
    code: "USD",
    symbol: "US$",
    decimalPlaces: 2,
    denominations: [
      { name: "Penny", value: 0.01 },
      { name: "Nickel", value: 0.05 },
      { name: "Dime", value: 0.1 },
      { name: "Quarter", value: 0.25 },
      { name: "One dollar bill", value: 1 },
      { name: "Two dollar bill", value: 2 },
      { name: "Five dollar bill", value: 5 },
      { name: "10 dollar bill", value: 10 },
      { name: "20 dollar bill", value: 20 },
      { name: "50 dollar bill", value: 50 },
      { name: "100 dollar bill", value: 100 },
    ],
  },
  {
    name: "Vietnamese Dong",
    code: "VND",
    symbol: "₫",
    decimalPlaces: 0,
    denominations: [
      { name: "10 thousand dong bill", value: 10_000 },
      { name: "20 thousand dong bill", value: 20_000 },
      { name: "50 thousand dong bill", value: 50_000 },
      { name: "100 thousand dong bill", value: 100_000 },
      { name: "200 thousand dong bill", value: 200_000 },
      { name: "500 thousand dong bill", value: 500_000 },
    ],
  },
];
export default currencies;
