import { StorageService } from "./storage";

export class AccountListService {
  static get() {
    return StorageService.get("accountList");
  }

  static set(value) {
    return StorageService.set("accountList", value);
  }
}
