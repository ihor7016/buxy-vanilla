import { ColorGeneratorService } from "../color-generator";

describe("ColorGeneratorService", () => {
  it("should return number #d{6}", () => {
    expect(ColorGeneratorService.get()).toMatch(/^#[a-f0-9]{6}$/);
  });
});
