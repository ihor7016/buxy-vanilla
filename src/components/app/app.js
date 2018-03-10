import template from "./app.html";
import { AddTagComponent } from "../add-tag-dialog/add-tag-dialog";

export class AppComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  handleAddTagOnclick() {
    this.addTagDialog.showDialog();
  }

  querySelectors() {
    this.addTagButton = this.mountPoint.querySelector(
      ".app__add-tag-dialog-activation"
    );
    this.addTagMountPoint = this.mountPoint.querySelector(
      ".app__add-tag-dialog"
    );
  }

  addEventListeners() {
    this.addTagButton.addEventListener(
      "click",
      this.handleAddTagOnclick.bind(this)
    );
  }

  mountChildren() {
    this.addTagDialog = new AddTagComponent(this.addTagMountPoint);
    this.addTagDialog.mount();
  }

  mount() {
    this.mountPoint.innerHTML = template({ name: "Ihor" });
    this.querySelectors();
    this.addEventListeners();
    this.mountChildren();
  }
}
