import { StorageService } from "../storage";
import { TransactionListService } from "../transaction-service";

describe("Transactions storage service", () => {
  const key = "transactionList";
  const transId = "1521743892606";
  const accId = "k1y7iof0ywh";
  const sample = [
    {
      desc: "Shell",
      tag: "Fuel",
      account: { id: "jayhzea75g" },
      id: "1521743949202"
    },
    {
      desc: "Salary",
      tag: "Salary",
      account: { id: "k1y7iof0ywh" },
      id: "1521743892606"
    }
  ];
  const dataToAdd = {
    desc: "Silpo",
    tag: "Food",
    account: {
      id: "tphny7oo27i"
    },
    id: "1521743753100"
  };
  const addRes = [
    {
      desc: "Silpo",
      tag: "Food",
      account: { id: "tphny7oo27i" },
      id: "1521743753100"
    },
    {
      desc: "Shell",
      tag: "Fuel",
      account: { id: "jayhzea75g" },
      id: "1521743949202"
    },
    {
      desc: "Salary",
      tag: "Salary",
      account: { id: "k1y7iof0ywh" },
      id: "1521743892606"
    }
  ];
  const delRes = [
    {
      desc: "Shell",
      tag: "Fuel",
      account: {
        id: "jayhzea75g"
      },
      id: "1521743949202"
    }
  ];

  beforeEach(() => {
    StorageService.get = jest.fn(() => Promise.resolve(sample));
    StorageService.set = jest.fn(() => Promise.resolve());
  });

  describe("get method", () => {
    it("should return array of objects", () => {
      return TransactionListService.get().then(arr => {
        expect(arr).toEqual(sample);
        expect(StorageService.get).toHaveBeenCalledWith(key);
      });
    });
  });

  describe("set method", () => {
    it("should send correct data", () => {
      return TransactionListService.set(sample).then(() => {
        expect(StorageService.set).toHaveBeenCalledWith(key, sample);
      });
    });
  });

  describe("add method", () => {
    it("should add, send and return array with only dataToAdd when list is null", () => {
      StorageService.get = jest.fn(() => Promise.resolve(null));
      return TransactionListService.add(dataToAdd).then(arr => {
        expect(StorageService.set).toHaveBeenCalledWith(key, [dataToAdd]);
        expect(arr).toEqual([dataToAdd]);
      });
    });

    it("should add, send and return correct data", () => {
      return TransactionListService.add(dataToAdd).then(arr => {
        expect(StorageService.set).toHaveBeenCalledWith(key, addRes);
        expect(arr).toEqual(addRes);
      });
    });
  });

  describe("del method", () => {
    it("should del, send and return correct data", () => {
      return TransactionListService.del(transId).then(arr => {
        expect(StorageService.set).toHaveBeenCalledWith(key, delRes);
        expect(arr).toEqual(delRes);
      });
    });
  });

  describe("deleteByAccountId method", () => {
    it("should do nothing when list is null", () => {
      StorageService.get = jest.fn(() => Promise.resolve(null));
      return TransactionListService.deleteByAccountId(accId).then(arr => {
        expect(StorageService.set).not.toBeCalled();
      });
    });

    it("should del and send correct data", () => {
      return TransactionListService.deleteByAccountId(accId).then(arr => {
        expect(StorageService.set).toHaveBeenCalledWith(key, delRes);
      });
    });
  });
});