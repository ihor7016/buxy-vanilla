export class CurrencyConverterUAH {
  static convert(curr, amount) {
    switch (curr) {
      case "USD":
        amount *= 27;
        break;
      case "EUR":
        amount *= 33;
        break;
      default:
        console.error(`convertor. no such currency: ${curr}`);
        return 0;
    }
    return amount;
  }
}
