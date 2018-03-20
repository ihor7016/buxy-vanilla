import { StorageService } from "./storage";

export class AccountListService {
  static add(account) {
    return this.get().then(accounts => {
      if (!accounts) {
        this.set([account]);
      } else {
        let updatedAccounts = [account].concat(accounts);
        this.set(updatedAccounts);
      }
    });
  }

  static update(transactionAccount, amount) {
    return this.get()
      .then(accounts => {
        return this.initAccounts(accounts || []);
      })
      .then(accounts => {
        let account = accounts.find(item => {
          return item.name === transactionAccount.name;
        });
        let index = accounts.findIndex(item => {
          return item.name === account.name;
        });
        account.balance = account.balance + amount;
        accounts[index] = account;
        this.set(accounts);
      });
  }

  static get() {
    return StorageService.get("accountList");
  }

  static set(value) {
    return StorageService.set("accountList", value);
  }

  static initAccounts(accounts) {
    this.set(accounts);
    return accounts;
  }
}
