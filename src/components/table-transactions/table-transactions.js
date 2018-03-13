import template from "./table-transactions.html";

export class TableTransactionsComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  mount() {
    this.mountPoint.innerHTML = template();
  }
}
