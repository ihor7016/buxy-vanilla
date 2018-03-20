import template from "./confirm-dialog.html";
import templateContent from "./confirm-dialog-content.html";
import { MDCDialog } from "@material/dialog";

export class ConfirmDialogComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  showDialog(data) {
    this.dialog.show();
    this.showInfo(data);
  }

  handleOkClick() {
    this.props.onOkClick(this.elem);
  }

  querySelectors() {
    this.confirmDialog = this.mountPoint.querySelector(".confirm-dialog");
    this.confirmDialogContent = this.mountPoint.querySelector(
      ".confirm-dialog__content"
    );
  }

  addInfo(type, name) {
    this.confirmDialogContent.innerHTML = templateContent({
      type: type,
      name: name
    });
  }

  initMDC() {
    this.dialog = new MDCDialog(this.confirmDialog);
  }

  addEventListeners() {
    this.dialog.listen("MDCDialog:accept", this.handleOkClick.bind(this));
  }

  showInfo(elem) {
    let elemDescription = elem.querySelector(".table-transactions__td--desc")
      .innerText;
    this.addInfo("transaction", elemDescription);
    this.elem = elem;
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.initMDC();
    this.addEventListeners();
  }
}
