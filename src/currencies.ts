export type Currency = {
  name: string;
  code: string;
  symbol: string;
  images: number[];
};

const currencies: Currency[] = [
  {
    name: "Australian dollar",
    code: "AUD",
    symbol: "A$",
    images: [0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100],
  },
  {
    name: "Euro",
    code: "EUR",
    symbol: "€",
    images: [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200],
  },
  {
    name: "Pound sterling (British pound)",
    code: "GBP",
    symbol: "£",
    images: [0.01, 0.02, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50],
  },
  {
    name: "US dollar",
    code: "USD",
    symbol: "US$",
    images: [0.01, 0.05, 0.1, 0.25, 1, 2, 5, 10, 20, 50, 100],
  },
  {
    name: "Vietnamese Dong",
    code: "VND",
    symbol: "₫",
    images: [10_000, 20_000, 50_000, 100_000, 200_000, 500_000],
  },
];
export default currencies;
