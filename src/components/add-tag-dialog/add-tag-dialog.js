import template from "./add-tag-dialog.html";
import { MDCDialog } from "@material/dialog";
import { MDCTextField } from "@material/textfield";

export class AddTagComponent {
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
    this.addTagDialog = this.mountPoint.querySelector(".add-tag-dialog");
    this.tagTextField = this.mountPoint.querySelector(".add-tag-dialog__tag");
  }

  initMDC() {
    this.dialog = new MDCDialog(this.addTagDialog);
    this.tag = new MDCTextField(this.tagTextField);
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
