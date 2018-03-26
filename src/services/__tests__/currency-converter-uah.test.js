import { CurrencyConverterUAHService } from "../currency-converter-uah";

describe("converts in UAH", () => {
  it("should convert 10 EUR in 330 UAH", () => {
    const curr = "EUR";
    const amount = 10;
    expect(CurrencyConverterUAHService.convert(curr, amount)).toBe(330);
  });

  it("should convert 10 USD in 270 UAH", () => {
    const curr = "USD";
    const amount = 10;
    expect(CurrencyConverterUAHService.convert(curr, amount)).toBe(270);
  });

  it("should return 0 with UAH", () => {
    const curr = "UAH";
    const amount = 10;
    expect(CurrencyConverterUAHService.convert(curr, amount)).toBe(0);
  });
});
