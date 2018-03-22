import template from "./about-dialog.html";
import { MDCDialog } from "@material/dialog";
import packageFile from "../../../package";

export class AboutDialogComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  showDialog() {
    this.dialog.show();
  }

  querySelectors() {
    this.aboutDialog = this.mountPoint.querySelector(".about-dialog");
  }

  initMDC() {
    this.dialog = new MDCDialog(this.aboutDialog);
  }

  mount() {
    this.mountPoint.innerHTML = template({ version: packageFile.version });
    this.querySelectors();
    this.initMDC();
  }
}
