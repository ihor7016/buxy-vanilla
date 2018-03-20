import template from "./confirm-dialog.html";
import { MDCDialog } from "@material/dialog";

export class ConfirmDialogComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  showDialog() {
    this.dialog.show();
  }

  handleOkClick() {
    this.props.onOkClicked();
  }

  querySelectors() {
    this.confirmDialog = this.mountPoint.querySelector(".confirm-dialog");
  }

  initMDC() {
    this.dialog = new MDCDialog(this.confirmDialog);
  }

  addEventListeners() {
    this.dialog.listen("MDCDialog:accept", this.handleOkClick.bind(this));
  }

  mount() {
    this.mountPoint.innerHTML = template({
      type: this.props.type,
      name: this.props.name
    });
    this.querySelectors();
    this.initMDC();
    this.addEventListeners();
  }
}
