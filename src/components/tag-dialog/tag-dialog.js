import template from "./tag-dialog.html";

import { MDCDialog } from "@material/dialog";
import { MDCTextField } from "@material/textfield";

export class TagDialogComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  showDialog(type, existingTagNames, tagToEdit) {
    if (tagToEdit) {
      this.tag.value = tagToEdit;
    }
    this.type = type;
    this.header.innerHTML = `${type} tag`;
    this.existingTagNames = existingTagNames;
    this.dialog.show();
  }

  querySelectors() {
    this.tagDialogComponent = this.mountPoint.querySelector(".tag-dialog");
    this.tagTextField = this.mountPoint.querySelector(".tag-dialog__tag");
    this.header = this.mountPoint.querySelector(".tag-dialog__header");
    this.dialogButtonConfirm = this.mountPoint.querySelector(
      ".tag-dialog__submit"
    );
  }

  initMDC() {
    this.dialog = new MDCDialog(this.tagDialogComponent);
    this.tag = new MDCTextField(this.tagTextField);
  }

  addEventListeners() {
    this.dialog.listen("MDCDialog:cancel", this.handleCancel.bind(this));
    this.dialogButtonConfirm.addEventListener(
      "click",
      this.handleOk.bind(this)
    );
  }

  clean() {
    this.tag.value = "";
    this.tagTextField.classList.remove("mdc-text-field--invalid");
  }

  handleOk() {
    if (this.isValid()) {
      if (this.type === "Edit") {
        this.props.onEditTagConfirm(this.tag.value);
      }
      if (this.type === "Add") {
        this.props.onAddTagConfirm(this.tag.value);
      }
      this.clean();
      this.dialog.close();
    } else {
      this.tagTextField.classList.add("mdc-text-field--invalid");
    }
  }

  isValid() {
    if (!this.tag.value) {
      return false;
    }
    if (this.existingTagNames.indexOf(this.tag.value) !== -1) {
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
