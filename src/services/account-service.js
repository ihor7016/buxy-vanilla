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
    });
  }

  static remove(index) {
    AccountService.get().then(accounts => {
      accounts.splice(index, 1);
      AccountService.set(accounts);
    });
  }

  static get() {
    return StorageService.get("accounts");
  }

  static set(accounts) {
    StorageService.set("accounts", accounts);
  }
}
