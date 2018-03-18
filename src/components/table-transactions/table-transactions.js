import template from "./table-transactions.html";
import templateRow from "./table-transactions-tr.html";

import { ButtonMoreComponent } from "../button-more/button-more";

export class TableTransactionsComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.transactionPoint = this.mountPoint.querySelector(
      ".table-transaction__tbody"
    );
  }

  addStoredTransactions(list) {
    const html = list ? list.map(data => this.createHtml(data)).join("") : "";
    this.transactionPoint.innerHTML = html;
    this.initMoreBtns();
  }

  addTransaction(data) {
    this.transactionPoint.innerHTML =
      this.createHtml(data) + this.transactionPoint.innerHTML;
    this.initMoreBtns();
  }

  createHtml(data) {
    return `
      <tr class="table-transactions__tr table-transactions__highlighted" data-id=
      ${data.id}>
      ${templateRow({ row: data })}
      </tr>
    `;
  }

  querySelectorsButtons() {
    this.moreBtnMountPoints = this.mountPoint.querySelectorAll(
      ".table-transactions__more-button"
    );
  }

  initMoreBtns() {
    this.querySelectorsButtons();
    Array.from(this.moreBtnMountPoints).forEach(point => {
      new ButtonMoreComponent(point, {
        position: "left",
        onDeleteClicked: this.handleDeleteClick.bind(this),
        onEditClicked: this.handleEditClick.bind(this)
      }).mount();
    });
  }

  handleEditClick() {
    console.log("handleEditClick");
  }

  handleDeleteClick() {
    console.log("handleDeleteClick");
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
  }
}
