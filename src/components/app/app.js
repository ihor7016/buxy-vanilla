import template from "./app.html";
import { AddTransactionComponent } from "../add-transaction-dialog/add-transaction-dialog";

export class AppComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.addTransactionDialogPoint = this.mountPoint.querySelector(
      ".app__add-transaction-dialog"
    );
  }

  mountChildren() {
    new AddTransactionComponent(this.addTransactionDialogPoint).mount();
  }

  mount() {
    this.mountPoint.innerHTML = template({ name: "Ihor" });
    this.querySelectors();
    this.mountChildren();
  }
}
