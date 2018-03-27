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

  static del(index) {
    return this.get().then(accounts => {
      accounts.splice(index, 1);
      this.set(accounts);
    });
  }

  static update(transactionAccount, amount) {
    return this.get()
      .then(accounts => {
        return accounts || [];
      })
      .then(accounts => {
        let index = accounts.findIndex(item => {
          return item.id === transactionAccount.id;
        });
        let account = accounts[index];
        account.balance = account.balance + amount;
        accounts[index] = account;
        this.set(accounts);
      });
  }

  static replace(account) {
    return this.get()
      .then(accounts => {
        return accounts || [];
      })
      .then(accounts => {
        let index = accounts.findIndex(item => {
          return item.id === account.id;
        });
        accounts[index] = account;
        this.set(accounts);
      });
  }

  static updateMultDel(list) {
    console.log(list);
    return this.get().then(accounts => {
      const newList = accounts.map(acc => {
        list.forEach(trans => {
          if (trans.account.id === acc.id) {
            acc.balance -= parseInt(trans.type + trans.amount);
          }
        });
        return acc;
      });
      return this.set(newList);
    });
  }

  static get() {
    return StorageService.get("accountList");
  }

  static set(value) {
    return StorageService.set("accountList", value);
  }
}
