export class CurrencyConverterUAH {
  static convert(curr, amount) {
    let uah;
    if (curr == "USD") {
      uah = amount * 27;
    } else if (curr == "EUR") {
      uah = amount * 33;
    } else {
      console.error(`converter. no such currency: ${curr}`);
      uah = 0;
    }
    return uah;
  }
}
