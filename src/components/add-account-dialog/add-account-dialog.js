import template from "./add-account-dialog.html";
import { MDCDialog } from "@material/dialog";
import { MDCTextField } from "@material/textfield";

export class AddAccountComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  showDialog() {
    this.dialog.show();
  }

  handlerAccept() {
    console.log("accepted");
  }

  handlerDecline() {
    console.log("declined");
  }

  querySelectors() {
    this.addAccountDialog = this.mountPoint.querySelector(
      ".add-account-dialog"
    );
    this.accountTextField = this.mountPoint.querySelector(
      ".add-account-dialog__account"
    );
  }

  initMDC() {
    this.dialog = new MDCDialog(this.addAccountDialog);
    this.account = new MDCTextField(this.accountTextField);
  }

  addEventListeners() {
    this.dialog.listen("MDCDialog:accept", this.handlerAccept.bind(this));
    this.dialog.listen("MDCDialog:cancel", this.handlerDecline.bind(this));
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.initMDC();
    this.addEventListeners();
  }
}
