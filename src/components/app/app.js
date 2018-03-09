import template from "./app.html";
import { AddTransactionComponent } from "../add-transaction-dialog/add-transaction-dialog";

export class AppComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  handlerOnclickBtnAddTransaction() {
    this.addTransacionDialog.showDialog();
  }

  querySelectors() {
    this.addTransactionButton = this.mountPoint.querySelector(
      ".app__add-transaction-dialog-activation"
    );
    this.addTransactionDialogPoint = this.mountPoint.querySelector(
      ".app__add-transaction-dialog"
    );
  }

  addEventListeners() {
    this.addTransactionButton.addEventListener(
      "click",
      this.handlerOnclickBtnAddTransaction.bind(this)
    );
  }

  mountChildren() {
    this.addTransacionDialog = new AddTransactionComponent(
      this.addTransactionDialogPoint
    );
    this.addTransacionDialog.mount();
  }

  mount() {
    this.mountPoint.innerHTML = template({ name: "Ihor" });
    this.querySelectors();
    this.addEventListeners();
    this.mountChildren();
  }
}
