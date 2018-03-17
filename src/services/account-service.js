import { StorageService } from "./storage";

export class AccountService {
  static add(account) {
    return AccountService.get().then(accounts => {
      if (!accounts) {
        AccountService.set([account]);
      } else {
        let updatedAccounts = [account].concat(accounts);
        AccountService.set(updatedAccounts);
      }
      resolve();
    });
  }

  static get() {
    return StorageService.get("accounts");
  }

  static set(accounts) {
    StorageService.set("accounts", accounts);
  }
}
