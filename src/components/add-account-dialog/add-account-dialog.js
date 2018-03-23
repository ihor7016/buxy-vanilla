import template from "./add-account-dialog.html";

import { MDCDialog } from "@material/dialog";
import { MDCTextField } from "@material/textfield";
import { MDCSelect } from "@material/select";

export class AddAccountDialogComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  showDialog(accounts) {
    this.accounts = accounts;
    this.dialog.show();
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
    this.accountNameHelperText = this.mountPoint.querySelector(
      ".add-account-dialog__account-helper-text"
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
    this.accountNameInput.onkeyup = this.handleKeyBoardEvent.bind(this);
    this.balanceNameInput.onkeyup = this.handleKeyBoardEvent.bind(this);
  }

  handleKeyBoardEvent(event) {
    let accountName = this.accountNameInput.value;

    if (this.accounts.length > 0) {
      this.accounts.some(item => {
        if (item.name === accountName) {
          this.showAccountError("This account already exists");
          return true;
        } else if (accountName.length < 3) {
          this.showAccountError("Name should be more than 3 symbols");
          return false;
        } else {
          this.hideAccountError();
          return false;
        }
      });
    } else {
      if (accountName.length < 3) {
        this.showAccountError("Name should be more than 3 symbols");
      } else {
        this.hideAccountError();
      }
    }
  }
  hideAccountError() {
    this.accountNameRipple.classList.remove(
      "add-account-dialog__input-ripple-error"
    );
    this.buttonOk.removeAttribute("disabled");
    this.accountNameHelperText.innerText = "";
  }

  showAccountError(msg) {
    this.buttonOk.setAttribute("disabled", "");
    this.accountNameRipple.classList.add(
      "add-account-dialog__input-ripple-error"
    );
    this.accountNameHelperText.innerText = msg;
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
  }
}
