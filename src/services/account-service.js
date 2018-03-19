import { StorageService } from "./storage";

export class AccountListService {
  
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
    return StorageService.get("accountList");
  }

  static set(value) {
    return StorageService.set("accountList", value);

  }
}
