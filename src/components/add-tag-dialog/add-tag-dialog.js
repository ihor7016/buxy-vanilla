import template from "./add-tag-dialog.html";

import { MDCDialog } from "@material/dialog";
import { MDCTextField } from "@material/textfield";

export class AddTagDialogComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  showDialog(tagsValue) {
    this.tagsValue = tagsValue;
    this.dialog.show();
  }

  querySelectors() {
    this.addTagDialogComponent = this.mountPoint.querySelector(
      ".add-tag-dialog"
    );
    this.tagTextField = this.mountPoint.querySelector(".add-tag-dialog__tag");
    this.tagNameInput = this.mountPoint.querySelector(".add-tag-dialog__input");
    this.dialogButtonConfirm = this.mountPoint.querySelector(
      ".add-tag-dialog__submit"
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
    this.tagNameInput.addEventListener(
      "focus",
      this.removeErrorClass.bind(this)
    );
  }

  clean() {
    this.tagNameInput.value = "";
    this.removeErrorClass();
  }

  removeErrorClass() {
    this.tagTextField.classList.remove("mdc-text-field--invalid");
  }

  handleOk() {
    if (this.isValid()) {
      this.props.onAddTagConfirm(this.tagNameInput.value);
      this.clean();
      this.dialog.close();
    } else {
      this.tagTextField.classList.add("mdc-text-field--invalid");
    }
  }

  isValid() {
    if (this.tagsValue.indexOf(this.tagNameInput.value) !== -1) {
      return false;
    }

    return true;
  }

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
