import template from "./add-account-dialog.html";

import { MDCDialog } from "@material/dialog";
import { MDCTextField } from "@material/textfield";
import { MDCSelect } from "@material/select";

export class AddAccountComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  showDialog() {
    this.dialog.show();
  }

  handleOk() {
    this.props.onAddAccountConfirmed({
      name: this.accountNameInput.value,
      type: this.accountType.innerText,
      currency: this.accountCurrency.innerText
    });
  }

  handleCancel() {
    console.log("declined");
  }

  querySelectors() {
    this.addAccountComponent = this.mountPoint.querySelector(
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
  }

  initMDC() {
    this.dialog = new MDCDialog(this.addAccountComponent);
    this.account = new MDCTextField(this.accountTextField);
    this.balance = new MDCTextField(this.balanceTextField);
    this.type = new MDCSelect(this.typeAccountSelect);
    this.currency = new MDCSelect(this.currencyAccountSelect);
  }

  addEventListeners() {
    this.dialog.listen("MDCDialog:accept", this.handleOk.bind(this));
    this.dialog.listen("MDCDialog:cancel", this.handleCancel.bind(this));
  }

  mount() {
    this.mountPoint.innerHTML = template({
      types: ["checking", "savings", "credit card", "cash"],
      currencies: ["UAH", "USD", "EUR"]
    });
    this.querySelectors();
    this.initMDC();
    this.addEventListeners();
  }
}
