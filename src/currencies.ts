type Currency = {
  name: string;
  code: string;
  symbol: string;
};

const currencies: Currency[] = [
  { name: "Australian dollar", code: "AUD", symbol: "A$" },
  { name: "Euro", code: "EUR", symbol: "€" },
  { name: "Pound sterling (British pound)", code: "GBP", symbol: "£" },
  { name: "US dollar", code: "USD", symbol: "US$" },
  { name: "Vietnamese Dong", code: "VND", symbol: "₫" },
];
export default currencies;
