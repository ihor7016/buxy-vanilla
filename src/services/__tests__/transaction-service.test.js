import { StorageService } from "../storage";
import { TransactionListService } from "../transaction-service";

jest.mock("../storage");

describe("Transactions storage service", () => {
  const key = "transactionList";
  const transId = "1521743892606";
  const accId = "jayhzea75g";
  const sample = [
    {
      desc: "Shell",
      tag: "Fuel",
      account: {
        id: "jayhzea75g"
      },
      id: "1521743949202"
    },
    {
      desc: "Salary",
      tag: "Salary",
      account: {
        id: "jayhzea75g"
      },
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
      account: { id: "jayhzea75g" },
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

  beforeAll(() => {
    StorageService.get.mockImplementation(() => Promise.resolve(sample));
    StorageService.set.mockImplementation(() => Promise.resolve());
  });

  test("get should return array of objects", () => {
    return TransactionListService.get().then(arr => {
      expect(arr).toEqual(sample);
      expect(StorageService.get).toHaveBeenCalledWith(key);
    });
  });

  test("set should send correct data", () => {
    return TransactionListService.set(sample).then(() => {
      expect(StorageService.set).toHaveBeenCalledWith(key, sample);
    });
  });

  test("add should add, send and return correct data", () => {
    return TransactionListService.add(dataToAdd).then(arr => {
      expect(StorageService.set).toHaveBeenCalledWith(key, addRes);
      expect(arr).toEqual(addRes);
    });
  });

  test("del should del, send and return correct data", () => {
    return TransactionListService.del(transId).then(arr => {
      expect(StorageService.set).toHaveBeenCalledWith(key, delRes);
      expect(arr).toEqual(delRes);
    });
  });

  test("deleteByAccountId should del and send correct data", () => {
    return TransactionListService.deleteByAccountId(accId).then(arr => {
      expect(StorageService.set).toHaveBeenCalledWith(key, delRes);
    });
  });
});
