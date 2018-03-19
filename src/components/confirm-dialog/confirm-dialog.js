import template from "./confirm-dialog.html";
import { MDCDialog } from "@material/dialog";

export class ConfirmDialogComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  showDialog() {
    this.dialog.show();
  }

  onOkClick() {
    console.log("accepted");
  }

  onCancelClick() {
    console.log("declined");
  }

  querySelectors() {
    this.confirmDialog = this.mountPoint.querySelector(".confirm-dialog");
  }

  initMDC() {
    this.dialog = new MDCDialog(this.confirmDialog);
  }

  addEventListeners() {
    this.dialog.listen("MDCDialog:accept", this.onOkClick.bind(this));
    this.dialog.listen("MDCDialog:cancel", this.onCancelClick.bind(this));
  }

  mount() {
    this.mountPoint.innerHTML = template({
      type: "account",
      name: "Privat"
    });
    this.querySelectors();
    this.initMDC();
    this.addEventListeners();
  }
}
