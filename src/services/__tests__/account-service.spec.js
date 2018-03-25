import { StorageService } from "../storage";
import { AccountListService } from "../account-service";
jest.mock("../storage");

describe("AccountListService", () => {
  const storageDbName = "accountList";

  const mockAccounts = [
    {
      storageDbName: "aaa",
      balance: 99,
      type: "cash",
      currency: "USD",
      id: "4sm6lbgmop"
    },
    {
      storageDbName: "bbb",
      balance: 90,
      type: "credit card",
      currency: "USD",
      id: "r9xvaj9golh"
    },
    {
      storageDbName: "ccc",
      balance: 791,
      type: "credit card",
      currency: "USD",
      id: "wzox7erodvr"
    }
  ];

  const mockAccountsWithoutElement1 = [
    {
      storageDbName: "aaa",
      balance: 99,
      type: "cash",
      currency: "USD",
      id: "4sm6lbgmop"
    },
    {
      storageDbName: "ccc",
      balance: 791,
      type: "credit card",
      currency: "USD",
      id: "wzox7erodvr"
    }
  ];

  const mockAccount = {
    storageDbName: "ddd",
    balance: 23232,
    type: "credit card",
    currency: "EUR",
    id: "wzox7eeedvr"
  };
  const transactionAccount = {
    storageDbName: "aaa",
    balance: 99,
    type: "cash",
    currency: "USD",
    id: "4sm6lbgmop"
  };
  const amount = 22;

  const accountToDeleteIndex = 1;

  beforeAll(() => {
    StorageService.get.mockImplementation(() => Promise.resolve(mockAccounts));
    StorageService.set.mockImplementation(() => Promise.resolve());
  });

  test("get()", () => {
    return AccountListService.get().then(res => {
      expect(res).toEqual(mockAccounts);
      expect(StorageService.get).toHaveBeenCalledWith(storageDbName);
    });
  });
  test("set(accounts)", () => {
    return AccountListService.set(mockAccounts).then(() => {
      expect(StorageService.set).toHaveBeenCalledWith(
        storageDbName,
        mockAccounts
      );
    });
  });

  test("del(account)", () => {
    return AccountListService.del(accountToDeleteIndex).then(() => {
      expect(StorageService.set).toHaveBeenCalledWith(
        storageDbName,
        mockAccountsWithoutElement1
      );
    });
  });

  test("add(account)", () => {
    return AccountListService.add(mockAccount).then(() => {
      expect(StorageService.set.mock.calls[0][1]).toContain(mockAccount);
    });
  });
  test("update(transactionAccount,amount)", () => {
    return AccountListService.update(transactionAccount, amount).then(() => {
      expect(StorageService.set.mock.calls[0][1][0].balance).toBe(121);
    });
  });
});
