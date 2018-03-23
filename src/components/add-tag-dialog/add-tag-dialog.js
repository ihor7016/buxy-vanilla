import template from "./add-tag-dialog.html";

import { MDCDialog } from "@material/dialog";
import { MDCTextField } from "@material/textfield";

export class AddTagDialogComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  showDialog(tagsArray) {
    console.log(tagsArray);
    this.dialog.show();
  }

  querySelectors() {
    this.addTagDialogComponent = this.mountPoint.querySelector(
      ".add-tag-dialog"
    );
    this.tagTextField = this.mountPoint.querySelector(".add-tag-dialog__tag");
    this.tagNameInput = this.mountPoint.querySelector(".mdc-text-field__input");
    this.dialogButtonConfirm = this.mountPoint.querySelector(
      ".mdc-dialog__footer__button--confirm"
    );
  }

  initMDC() {
    this.dialog = new MDCDialog(this.addTagDialogComponent);
    this.tag = new MDCTextField(this.tagTextField);
  }

  addEventListeners() {
    this.dialogButtonConfirm.addEventListener(
      "click",
      this.handleOk.bind(this)
    );
    this.dialog.listen("MDCDialog:cancel", this.handleCancel.bind(this));
  }

  clean() {
    this.tagNameInput.value = "";
  }

  handleOk() {
    if (!(this.tagNameInput.value === "")) {
      this.props.onAddTagConfirm(this.tagNameInput.value);
      this.clean();
      this.dialog.close();
    }
  }

  isValid() {}

  handleCancel() {
    this.clean();
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.initMDC();
    this.addEventListeners();
  }
}
