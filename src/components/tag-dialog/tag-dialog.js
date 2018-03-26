import template from "./tag-dialog.html";

import { MDCDialog } from "@material/dialog";
import { MDCTextField } from "@material/textfield";

export class TagDialogComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  showDialog(type, tagToEdit) {
    this.type = type;
    this.header.innerHTML = `${type} tag`;
    this.tag.value = tagToEdit || "";
    this.dialog.show();
  }

  querySelectors() {
    this.tagDialogComponent = this.mountPoint.querySelector(".tag-dialog");
    this.tagTextField = this.mountPoint.querySelector(".tag-dialog__tag");
    this.header = this.mountPoint.querySelector(".tag-dialog__header");
  }

  initMDC() {
    this.dialog = new MDCDialog(this.tagDialogComponent);
    this.tag = new MDCTextField(this.tagTextField);
  }

  addEventListeners() {
    this.dialog.listen("MDCDialog:accept", this.handleOk.bind(this));
    this.dialog.listen("MDCDialog:cancel", this.handleCancel.bind(this));
  }

  clean() {
    this.tag.value = "";
  }

  handleOk() {
    if (this.type === "Edit") {
      this.props.onEditTagConfirm(this.tag.value);
    }
    if (this.type === "Add") {
      this.props.onAddTagConfirm(this.tag.value);
    }
    this.clean();
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
