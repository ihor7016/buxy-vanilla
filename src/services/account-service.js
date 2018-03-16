import { StorageService } from "./storage";

export class AccountService {
  static get() {
    return StorageService.get("accounts");
  }

  static set(accounts) {
    StorageService.set("accounts", accounts);
  }
}
