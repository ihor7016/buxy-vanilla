import { StorageService } from "./storage";

export class AccountListService {
  get() {
    return StorageService.get("accountList");
  }

  set(value) {
    return StorageService.set("accountList", value);
  }
}
