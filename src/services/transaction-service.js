import { StorageService } from "./storage";

export class TransactionListService {
  get() {
    return StorageService.get("transactionList");
  }

  set(value) {
    StorageService.set("transactionList", value);
  }
}
