import template from "./buxy-table-transactions.html";

export class buxyTableTransactionsComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  mount() {
    this.mountPoint.innerHTML = template();
  }
}
