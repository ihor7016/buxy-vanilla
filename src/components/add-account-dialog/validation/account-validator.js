export class AccountValidator {
  isAccountValid(accountName, accounts) {
    let result = true;
    if (this.isEmpty(accountName)) {
      this.accountErrorMessage = "Enter account name";
      result = false;
    }
    if (accounts && accounts.length > 0) {
      accounts.some(item => {
        if (item.name === accountName) {
          this.accountErrorMessage = "This account already exists";
          result = false;
          return true;
        } else if (accountName.length < 3) {
          this.accountErrorMessage = "Name should be more than 3 symbols";
          result = false;
          return false;
        } else {
          this.accountErrorMessage = "";
          return false;
        }
      });
    } else {
      if (accountName.length < 3 || this.isEmpty(accountName)) {
        this.accountErrorMessage = "Name should be more than 3 symbols";
        result = false;
      } else {
        this.accountErrorMessage = "";
      }
    }
    return result;
  }

  isBalanceValid(balanceValue) {
    let result = true;
    if (this.isEmpty(balanceValue)) {
      this.balanceErrorMessage = "Enter the balance";
      result = false;
    }
    if (!this.isNumber(balanceValue) && !this.isFloatNumber(balanceValue)) {
      this.balanceErrorMessage = "Enter the number";
      result = false;
    } else {
      this.balanceErrorMessage = "";
    }
    return result;
  }

  isNumber(value) {
    let pattern = /^\d+$/gi;
    return pattern.test(value);
  }

  isEmpty(value) {
    return !value || value.length == 0;
  }

  isFloatNumber(value) {
    let pattern = /^\d+\.\d+$/gi;
    return pattern.test(value);
  }

  getAccountErrorMessage() {
    return this.accountErrorMessage;
  }

  getBalanceErrorMessage() {
    return this.balanceErrorMessage;
  }
}
