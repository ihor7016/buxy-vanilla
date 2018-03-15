import { StorageService } from "./storage";

export class TransactionListService {
  get() {
    return StorageService.get("transactionList");
  }

  set(value) {
    return StorageService.set("transactionList", value);
  }
}
