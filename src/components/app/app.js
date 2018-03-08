import template from "./app.html";
import { BuxyTableTransactionsComponent } from "../buxy-table-transactions/buxy-table-transactions";

export class AppComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
     this.BuxyTableTransactionsMountPoint = this.mountPoint.querySelector(
      ".app__buxy-table-transactions"
    );
      
  mount() {
    this.mountPoint.innerHTML = template({ name: "Ihor" });
    this.querySelectors();
  }
}
