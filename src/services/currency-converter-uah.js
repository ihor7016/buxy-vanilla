export class CurrencyConverterUAHService {
  static convert(curr, amount) {
    if (curr === "USD") {
      return amount * 27;
    }
    if (curr === "EUR") {
      return amount * 33;
    }
    return 0;
  }
}
