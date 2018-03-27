import template from "./account-dialog.html";

import { MDCDialog } from "@material/dialog";
import { MDCTextField } from "@material/textfield";
import { MDCSelect } from "@material/select";

export class AccountDialogComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  showDialog(accounts) {
    this.accounts = accounts;
    this.dialog.show();
    this.type.selectedIndex = 0;
    this.currency.selectedIndex = 0;
  }

  querySelectors() {
    this.addAccountDialogComponent = this.mountPoint.querySelector(
      ".account-dialog"
    );
    this.accountTextField = this.mountPoint.querySelector(
      ".account-dialog__account"
    );
    this.balanceTextField = this.mountPoint.querySelector(
      ".account-dialog__balance"
    );
    this.accountNameInput = this.mountPoint.querySelector(
      ".account-dialog__account-input"
    );
    this.balanceNameInput = this.mountPoint.querySelector(
      ".account-dialog__balance-input"
    );
    this.typeAccountSelect = this.mountPoint.querySelector(
      ".account-dialog__type"
    );
    this.currencyAccountSelect = this.mountPoint.querySelector(
      ".account-dialog__currency"
    );
    this.accountType = this.mountPoint.querySelector(
      ".account-dialog__type-text"
    );
    this.accountCurrency = this.mountPoint.querySelector(
      ".account-dialog__currency-text"
    );
    this.accountNameRipple = this.mountPoint.querySelector(
      ".account-dialog__input-ripple"
    );
    this.balanceNameRipple = this.mountPoint.querySelector(
      ".account-dialog__balance-input-ripple"
    );
    this.accountNameHelperText = this.mountPoint.querySelector(
      ".account-dialog__account-helper-text"
    );
    this.balanceNameHelperText = this.mountPoint.querySelector(
      ".account-dialog__balance-helper-text"
    );
    this.buttonOk = this.mountPoint.querySelector(".account-dialog__button-ok");
  }

  initMDC() {
    this.dialog = new MDCDialog(this.addAccountDialogComponent);
    this.account = new MDCTextField(this.accountTextField);
    this.balance = new MDCTextField(this.balanceTextField);
    this.type = new MDCSelect(this.typeAccountSelect);
    this.currency = new MDCSelect(this.currencyAccountSelect);
  }

  addEventListeners() {
    this.dialog.listen("MDCDialog:cancel", this.handleCancel.bind(this));
    this.buttonOk.addEventListener("click", this.handleOk.bind(this));
  }

  checkValidation() {
    let result = false;
    let isAccountValid = this.isAccountValid(
      this.accountNameInput.value,
      this.accounts
    );
    let isBalanceValid = this.isBalanceValid(this.balanceNameInput.value);
    let isTypeSelected = !!this.type.value;
    let isCurrencySelected = !!this.currency.value;

    if (
      isAccountValid &&
      isBalanceValid &&
      isTypeSelected &&
      isCurrencySelected
    ) {
      result = true;
    }
    if (!isAccountValid) {
      this.showAccountError(this.getAccountErrorMessage());

      result = false;
    } else {
      this.hideAccountError();
    }
    if (!isBalanceValid) {
      this.showBalanceError(this.getBalanceErrorMessage());
      result = false;
    } else {
      this.hideBalanceError();
    }
    return result;
  }

  hideAccountError() {
    this.accountTextField.classList.remove("mdc-text-field--invalid");
    this.accountNameHelperText.innerText = "";
  }

  showAccountError(msg) {
    this.accountTextField.classList.add("mdc-text-field--invalid");
    this.accountNameHelperText.innerText = msg;
  }

  hideBalanceError() {
    this.balanceTextField.classList.remove("mdc-text-field--invalid");
    this.balanceNameHelperText.innerText = "";
  }

  showBalanceError(msg) {
    this.balanceTextField.classList.add("mdc-text-field--invalid");
    this.balanceNameHelperText.innerText = msg;
  }

  clean() {
    this.accountNameInput.value = "";
    this.balanceNameInput.value = "";
    this.type.selectedIndex = -1;
    this.currency.selectedIndex = -1;
  }

  handleOk() {
    if (this.checkValidation()) {
      this.props.onAddAccountConfirm({
        name: this.accountNameInput.value,
        balance: parseInt(this.balanceNameInput.value),
        type: this.accountType.innerText,
        currency: this.accountCurrency.innerText,
        id: Math.random()
          .toString(36)
          .substring(2)
      });
      this.dialog.close();
      this.clean();
    }
  }

  handleCancel() {
    this.clean();
  }

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
        } else {
          this.checkForEmptyStringAndLength(accountName, result);
        }
      });
    } else {
      result = this.checkForEmptyStringAndLength(accountName, result);
    }
    return result;
  }

  checkForEmptyStringAndLength(accountName, result) {
    if (accountName.length < 3 || this.isEmpty(accountName)) {
      this.accountErrorMessage = "Name should be more than 3 symbols";
      result = false;
    } else {
      this.accountErrorMessage = "";
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

  mount() {
    this.mountPoint.innerHTML = template({
      types: [
        "checking",
        "savings",
        "credit card",
        "cash",
        "investiment",
        "loan",
        "cd",
        "real estate",
        "vehicle",
        "insurance",
        "other"
      ],
      currencies: ["UAH", "USD", "EUR"]
    });
    this.querySelectors();
    this.initMDC();
    this.addEventListeners();
  }
}
