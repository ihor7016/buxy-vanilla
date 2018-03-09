import template from "./app.html";
import { buxyTableTransactionsComponent } from "../buxy-table-transactions/buxy-table-transactions";

export class AppComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
     this.buxyTableTransactionsMountPoint = this.mountPoint.querySelector(
      ".app-buxy-table-transactions"
    );
  }

  mountChildren() {
    new buxyTableTransactionsComponent(this.buxyTableTransactionsMountPoint).mount();
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.mountChildren();
  }
}
