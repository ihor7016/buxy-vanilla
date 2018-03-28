import { ColorGeneratorService } from "../color-generator";

beforeAll(() => {
  Math.random = jest.fn(() => 0.5);
});

describe("ColorGeneratorService", () => {
  it("should return rgb", () => {
    expect(ColorGeneratorService.get()).toMatch(/^#[a-f0-9]{6}$/);
  });
});
