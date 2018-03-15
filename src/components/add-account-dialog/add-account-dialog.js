import template from "./add-account-dialog.html";

import { MDCDialog } from "@material/dialog";
import { MDCTextField } from "@material/textfield";
import { MDCSelect } from "@material/select";
import { Account } from "../../services/model/account";

export class AddAccountComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  showDialog() {
    this.dialog.show();
  }

  handleOk() {
    console.log("accepted");
    let account = new Account(
      this.accountTextField.value,
      this.accountType.innerText,
      this.accountCurrency.innerText
    );
    this.props.onAddAccountConfirmed(account);
  }

  handleCancel() {
    console.log("declined");
  }

  querySelectors() {
    this.addAccountDialog = this.mountPoint.querySelector(
      ".add-account-dialog"
    );
    this.accountTextField = this.mountPoint.querySelector(
      ".add-account-dialog__account"
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
    this.dialog = new MDCDialog(this.addAccountDialog);
    this.account = new MDCTextField(this.accountTextField);
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
      currencies: ["Ukraine, UAH", "United States, USD", "Europe, EUR"]
    });
    this.querySelectors();
    this.initMDC();
    this.addEventListeners();
  }
}
