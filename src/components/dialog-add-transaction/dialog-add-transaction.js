import template from "./dialog-add-transaction.html";

export class AddTransactionComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  mount() {
    this.mountPoint.innerHTML = template({
      /* name: "Ihor" */
    });
  }
}
