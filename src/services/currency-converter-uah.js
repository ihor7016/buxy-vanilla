export class CurrencyConverterUAH {
  static convert(curr, amount) {
    if (curr === "USD") {
      return amount * 27;
    } else if (curr === "EUR") {
      return amount * 33;
    }
    return 0;
  }
}
