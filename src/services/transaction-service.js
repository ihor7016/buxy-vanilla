import { StorageService } from "./storage";

export class TransactionListService {
  static get() {
    return StorageService.get("transactionList");
  }

  static set(value) {
    return StorageService.set("transactionList", value);
  }
}
