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
    });
  }

  static del(id) {
    return this.get().then(list => {
      const newList = list.filter(elem => elem.id !== id);
      this.set(newList);
      return newList;
    });
  }
}
