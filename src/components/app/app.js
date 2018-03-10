import template from "./app.html";
import { TableTransactionsComponent } from "../buxy-table-transactions/buxy-table-transactions";

export class AppComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
     this.tableTransactionsMountPoint = this.mountPoint.querySelector(
      ".app__table-transactions"
    );
  }

  mountChildren() {
    new TableTransactionsComponent(this.tableTransactionsMountPoint).mount();
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.mountChildren();
  }
}
