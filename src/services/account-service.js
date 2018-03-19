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

  static update(account, amount) {
    return this.get()
      .then(accounts => {
        if (!accounts) {
          return new Error("empty accounts");
        } else {
          return accounts.find(item => {
            return item.name === account.name;
          });
        }
      })
      .then(account => {
        this.get().then(accounts => {
          let index = accounts.findIndex(item => {
            return item.name === account.name;
          });
          account.balance = parseInt(account.balance) + amount;
          accounts[index] = account;
          this.set(accounts);
        });
      });
  }

  static get() {
    return StorageService.get("accountList");
  }

  static set(value) {
    return StorageService.set("accountList", value);
  }
}
