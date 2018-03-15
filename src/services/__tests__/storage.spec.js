import { StorageService } from "../storage";

describe("StorageService", () => {
  const sampleObj = {
    prop: "val"
  };
  const name = "someName";

  beforeAll(() => {
    window.localStorage = {
      setItem: jest.fn(),
      getItem: jest.fn(() => JSON.stringify(sampleObj))
    };
  });

  beforeEach(() => {
    window.localStorage.setItem.mockClear();
    window.localStorage.getItem.mockClear();
  });

  describe("get method", () => {
    it("should return correct item", () => {
      return StorageService.get(name).then(res => {
        expect(window.localStorage.getItem).toHaveBeenCalledWith(name);
        expect(res).toEqual(sampleObj);
      });
    });
  });

  describe("set method", () => {
    it("should set item correctly", () => {
      return StorageService.set(name, sampleObj).then(() => {
        expect(window.localStorage.setItem).toHaveBeenCalledWith(
          name,
          JSON.stringify(sampleObj)
        );
      });
    });
  });
});
