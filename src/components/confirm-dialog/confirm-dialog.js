import template from "./confirm-dialog.html";
import { MDCDialog } from "@material/dialog";

export class ConfirmDialogComponent {
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
    this.confirmDialog = this.mountPoint.querySelector(".confirm-dialog");
  }

  initMDC() {
    this.dialog = new MDCDialog(this.confirmDialog);
  }

  addEventListeners() {
    this.dialog.listen("MDCDialog:accept", this.handleOk.bind(this));
    this.dialog.listen("MDCDialog:cancel", this.handleCancel.bind(this));
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.initMDC();
    this.addEventListeners();
  }
}
