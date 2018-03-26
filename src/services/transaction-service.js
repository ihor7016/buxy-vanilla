import { StorageService } from "./storage";

export class TransactionListService {
  static get() {
    return StorageService.get("transactionList");
  }

  static set(value) {
    return StorageService.set("transactionList", value);
  }

  static add(data) {
    return this.get().then(list => {
      const newList = list ? [data].concat(list) : [data];
      this.set(newList);
      return newList;
    });
  }

  static del(id) {
    return this.get().then(list => {
      const newList = list.filter(elem => elem.id !== id);
      this.set(newList);
      return newList;
    });
  }

  static update(oldId, newData) {
    return this.get().then(list => {
      const newList = list.map(elem => {
        if (elem.id !== oldId) {
          return elem;
        } else {
          return newData;
        }
      });
      this.set(newList);
      return newList;
    });
  }

  static deleteByAccountId(accountId) {
    return TransactionListService.get().then(transactions => {
      if (transactions) {
        return TransactionListService.set(
          transactions.filter(item => {
            return item.account.id !== accountId;
          })
        );
      }
    });
  }
}
