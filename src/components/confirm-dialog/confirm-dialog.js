import template from "./confirm-dialog.html";
import { MDCDialog } from "@material/dialog";

export class ConfirmDialogComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  showDialog(type, name) {
    Array.from(this.confirmDialogTypes).forEach(el => {
      el.innerHTML = type;
    });
    this.confirmDialogName.innerHTML = name;
    this.dialog.show();
  }

  handleOkClick() {
    this.props.onOkClick();
  }

  querySelectors() {
    this.confirmDialog = this.mountPoint.querySelector(".confirm-dialog");
    this.confirmDialogTypes = this.mountPoint.querySelectorAll(
      ".confirm-dialog__type"
    );
    this.confirmDialogName = this.mountPoint.querySelector(
      ".confirm-dialog__name"
    );
  }

  initMDC() {
    this.dialog = new MDCDialog(this.confirmDialog);
  }

  addEventListeners() {
    this.dialog.listen("MDCDialog:accept", this.handleOkClick.bind(this));
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.initMDC();
    this.addEventListeners();
  }
}
