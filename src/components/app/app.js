import template from "./app.html";
import { AddAccountComponent } from "../add-account-dialog/add-account-dialog";

export class AppComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  handleOnclickBtnAddAccount() {
    this.addAccountDialog.showDialog();
  }

  querySelectors() {
    this.addAccountButton = this.mountPoint.querySelector(
      ".app__add-account-dialog-activation"
    );
    this.addAccountMountPoint = this.mountPoint.querySelector(
      ".app__add-account-dialog"
    );
  }

  addEventListeners() {
    this.addAccountButton.addEventListener(
      "click",
      this.handleOnclickBtnAddAccount.bind(this)
    );
  }

  mountChildren() {
    this.addAccountDialog = new AddAccountComponent(this.addAccountMountPoint);
    this.addAccountDialog.mount();
  }

  mount() {
    this.mountPoint.innerHTML = template({ name: "Ihor" });
    this.querySelectors();
    this.addEventListeners();
    this.mountChildren();
  }
}
