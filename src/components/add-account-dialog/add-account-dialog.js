import template from "./add-account-dialog.html";

import { MDCDialog } from "@material/dialog";
import { MDCTextField } from "@material/textfield";
import { MDCSelect } from "@material/select";
import { AccountValidator } from "./validation/account-validator";

export class AddAccountDialogComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  showDialog(accounts) {
    this.accounts = accounts;
    this.dialog.show();
  }

  initValidator() {
    this.validator = new AccountValidator();
  }

  querySelectors() {
    this.addAccountDialogComponent = this.mountPoint.querySelector(
      ".add-account-dialog"
    );
    this.accountTextField = this.mountPoint.querySelector(
      ".add-account-dialog__account"
    );
    this.balanceTextField = this.mountPoint.querySelector(
      ".add-account-dialog__balance"
    );
    this.accountNameInput = this.mountPoint.querySelector(
      ".add-account-dialog__account-input"
    );
    this.balanceNameInput = this.mountPoint.querySelector(
      ".add-account-dialog__balance-input"
    );
    this.typeAccountSelect = this.mountPoint.querySelector(
      ".add-account-dialog__type"
    );
    this.currencyAccountSelect = this.mountPoint.querySelector(
      ".add-account-dialog__currency"
    );
    this.accountType = this.mountPoint.querySelector(
      ".add-account-dialog__type-text"
    );
    this.accountCurrency = this.mountPoint.querySelector(
      ".add-account-dialog__currency-text"
    );
    this.accountNameRipple = this.mountPoint.querySelector(
      ".add-account-dialog__input-ripple"
    );
    this.balanceNameRipple = this.mountPoint.querySelector(
      ".add-account-dialog__balance-input-ripple"
    );
    this.accountNameHelperText = this.mountPoint.querySelector(
      ".add-account-dialog__account-helper-text"
    );
    this.balanceNameHelperText = this.mountPoint.querySelector(
      ".add-account-dialog__balance-helper-text"
    );
    this.buttonOk = this.mountPoint.querySelector(
      ".add-account-dialog__button-ok"
    );
  }

  initMDC() {
    this.dialog = new MDCDialog(this.addAccountDialogComponent);
    this.account = new MDCTextField(this.accountTextField);
    this.balance = new MDCTextField(this.balanceTextField);
    this.type = new MDCSelect(this.typeAccountSelect);
    this.currency = new MDCSelect(this.currencyAccountSelect);
  }

  addEventListeners() {
    this.dialog.listen("MDCDialog:accept", this.handleOk.bind(this));
    this.dialog.listen("MDCDialog:cancel", this.handleCancel.bind(this));
    this.accountNameInput.onkeyup = this.handleAccountNameKeyBoardEvent.bind(
      this
    );
    this.accountNameInput.onkeydown = this.handleAccountNameKeyBoardEvent.bind(
      this
    );
    this.balanceNameInput.onkeyup = this.handleBalanceKeyBoardEvent.bind(this);
    this.balanceNameInput.onkeydown = this.handleBalanceKeyBoardEvent.bind(
      this
    );
  }

  handleBalanceKeyBoardEvent() {
    this.checkValidation();
  }

  handleAccountNameKeyBoardEvent() {
    this.checkValidation();
  }

  checkValidation() {
    let isAccountValid = this.validator.isAccountValid(
      this.accountNameInput.value,
      this.accounts
    );
    let isBalanceValid = this.validator.isBalanceValid(
      this.balanceNameInput.value
    );
    if (isAccountValid && isBalanceValid) {
      this.enableOkButton();
    }
    if (!isAccountValid) {
      this.disableOkButton();
      this.showAccountError(this.validator.getAccountErrorMessage());
    } else {
      this.hideAccountError();
    }
    if (!isBalanceValid) {
      this.disableOkButton();
      this.showBalanceError(this.validator.getBalanceErrorMessage());
    } else {
      this.hideBalanceError();
    }
  }

  enableOkButton() {
    this.buttonOk.removeAttribute("disabled");
  }

  disableOkButton() {
    this.buttonOk.setAttribute("disabled", "");
  }

  hideAccountError() {
    this.accountNameRipple.classList.remove(
      "add-account-dialog__input-ripple-error"
    );
    this.accountNameHelperText.innerText = "";
  }

  showAccountError(msg) {
    this.accountNameRipple.classList.add(
      "add-account-dialog__input-ripple-error"
    );
    this.accountNameHelperText.innerText = msg;
  }

  hideBalanceError() {
    this.balanceNameRipple.classList.remove(
      "add-account-dialog__balance-input-ripple-error"
    );
    this.balanceNameHelperText.innerText = "";
  }

  showBalanceError(msg) {
    this.balanceNameRipple.classList.add(
      "add-account-dialog__balance-input-ripple-error"
    );
    this.balanceNameHelperText.innerText = msg;
  }

  clean() {
    this.accountNameInput.value = "";
    this.balanceNameInput.value = "";
    this.type.selectedIndex = -1;
    this.currency.selectedIndex = -1;
  }

  handleOk() {
    this.props.onAddAccountConfirm({
      name: this.accountNameInput.value,
      balance: parseInt(this.balanceNameInput.value),
      type: this.accountType.innerText,
      currency: this.accountCurrency.innerText
    });
    this.clean();
  }

  handleCancel() {
    this.clean();
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
    this.initValidator();
    this.checkValidation();
  }
}
