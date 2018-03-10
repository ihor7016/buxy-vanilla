import template from "./add-account-dialog.html";
import { MDCDialog } from "@material/dialog";
import { MDCTextField } from "@material/textfield";
import { MDCSelect } from "@material/select";

export class AddAccountComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  showDialog() {
    this.dialog.show();
  }

  handleOk() {
    console.log("accepted");
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
