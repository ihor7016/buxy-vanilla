import template from "./add-transaction-dialog.html";

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
