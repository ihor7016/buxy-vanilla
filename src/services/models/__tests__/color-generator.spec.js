import { ColorGeneratorService } from "../../common/color-generator";

describe("ColorGeneratorService", () => {
  beforeAll(() => {
    Math.random = jest.fn(() => 0.5);
  });

  describe("method get", () => {
    it("should return rgb string", () => {
      expect(ColorGeneratorService.get()).toBe("#800000");
    });
  });
});
