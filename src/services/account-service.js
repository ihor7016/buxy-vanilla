import { StorageService } from "./storage";

export class AccountService {
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

  static get() {
    return StorageService.get("accounts");
  }

  static set(accounts) {
    StorageService.set("accounts", accounts);
  }
}
