import template from "./add-account-dialog.html";

import { MDCDialog } from "@material/dialog";
import { MDCTextField } from "@material/textfield";
import { MDCSelect } from "@material/select";

export class AddAccountDialogComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  showAddDialog() {
    this.accountTitle.innerText = "Add account";
    this.dialog.show();
  }

  showDialogEdit(account) {
    this.account = account;
    this.accountTitle.innerText = "Edit";
    this.accountName.value = account.name;
    this.balance.value = account.balance;

    this.currency.selectedIndex = this.getCurrencies().findIndex(item => {
      return item === account.currency;
    });
    this.type.selectedIndex = this.getTypes().findIndex(item => {
      return item === account.type;
    });
    this.isEditMode = true;
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
    this.accountTitle = this.mountPoint.querySelector(
      ".add-account-dialog__title"
    );
  }

  initMDC() {
    this.dialog = new MDCDialog(this.addAccountDialogComponent);
    this.accountName = new MDCTextField(this.accountTextField);
    this.balance = new MDCTextField(this.balanceTextField);
    this.type = new MDCSelect(this.typeAccountSelect);
    this.currency = new MDCSelect(this.currencyAccountSelect);
  }

  addEventListeners() {
    this.dialog.listen("MDCDialog:accept", this.handleOk.bind(this));
    this.dialog.listen("MDCDialog:cancel", this.handleCancel.bind(this));
  }

  clean() {
    this.accountNameInput.value = "";
    this.balanceNameInput.value = "";
    this.type.selectedIndex = -1;
    this.currency.selectedIndex = -1;
  }

  handleOk() {
    if (!this.isEditMode) {
      this.props.onAddAccountConfirm({
        name: this.accountNameInput.value,
        balance: parseInt(this.balanceNameInput.value),
        type: this.accountType.innerText,
        currency: this.accountCurrency.innerText,
        id: Math.random()
          .toString(36)
          .substring(2)
      });
    } else {
      this.props.onEditAccountConfirm({
        name: this.accountNameInput.value,
        balance: parseInt(this.balanceNameInput.value),
        type: this.accountType.innerText,
        currency: this.accountCurrency.innerText,
        id: this.account.id
      });
    }
    this.clean();
  }

  handleCancel() {
    this.clean();
  }

  getTypes() {
    return [
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
    ];
  }

  getCurrencies() {
    return ["UAH", "USD", "EUR"];
  }

  mount() {
    this.mountPoint.innerHTML = template({
      types: this.getTypes(),
      currencies: this.getCurrencies()
    });
    this.querySelectors();
    this.initMDC();
    this.addEventListeners();
  }
}
