import template from "./add-tag-dialog.html";

import { MDCDialog } from "@material/dialog";
import { MDCTextField } from "@material/textfield";
import { Tag } from "../../../model/tag";

export class AddTagComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  showDialog() {
    this.dialog.show();
  }

  handleOk() {
    console.log("accepted");
    let tag = new Tag(this.tagNameInput.value);
    this.props.onAddTagConfirmed(tag);
  }

  handleCancel() {
    console.log("declined");
  }

  querySelectors() {
    this.addTagComponent = this.mountPoint.querySelector(".add-tag-dialog");
    this.tagTextField = this.mountPoint.querySelector(".add-tag-dialog__tag");
    this.tagNameInput = this.mountPoint.querySelector(".mdc-text-field__input");
  }

  initMDC() {
    this.dialog = new MDCDialog(this.addTagComponent);
    this.tag = new MDCTextField(this.tagTextField);
  }

  addEventListeners() {
    this.dialog.listen("MDCDialog:accept", this.handleOk.bind(this));
    this.dialog.listen("MDCDialog:cancel", this.handleCancel.bind(this));
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.initMDC();
    this.addEventListeners();
  }
}
