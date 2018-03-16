export class CurrencyConverterUAH {
  static convert(curr, amount) {
    let uah;
    switch (curr) {
      case "USD":
        uah = amount * 27;
        break;
      case "EUR":
        uah = amount * 33;
        break;
      default:
        console.error(`converter. no such currency: ${curr}`);
        return 0;
    }
    return uah;
  }
}
