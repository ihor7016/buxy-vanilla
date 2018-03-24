import { CurrencyConverterUAHService } from "../currency-converter-uah";

describe("converts in UAH", () => {
  test("10 EUR equals 330 UAH", () => {
    const curr = "EUR";
    const amount = 10;
    expect(CurrencyConverterUAHService.convert(curr, amount)).toBe(330);
  });

  test("10 USD equals 270 UAH", () => {
    const curr = "USD";
    const amount = 10;
    expect(CurrencyConverterUAHService.convert(curr, amount)).toBe(270);
  });
});
