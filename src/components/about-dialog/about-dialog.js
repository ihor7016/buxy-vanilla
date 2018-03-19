import template from "./about-dialog.html";
import { MDCDialog } from "@material/dialog";

export class AboutDialogComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  showDialog() {
    this.dialog.show();
  }

  handleOk() {
    console.log("accepted");
  }

  querySelectors() {
    this.aboutDialog = this.mountPoint.querySelector(".about-dialog");
  }

  initMDC() {
    this.dialog = new MDCDialog(this.aboutDialog);
  }

  addEventListeners() {
    this.dialog.listen("MDCDialog:accept", this.handleOk.bind(this));
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.initMDC();
    this.addEventListeners();
  }
}
