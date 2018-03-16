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
    if (list) list.forEach(row => this.addTransaction(row));
  }

  addTransaction(row) {
    // console.log(row);
    this.transactionPoint.innerHTML =
      templateRow({
        row: row
      }) + this.transactionPoint.innerHTML;
  }

  querySelectorsTransactions() {
    this.dates = this.mountPoint.querySelectorAll(".table-transactions__date");
    this.types = this.mountPoint.querySelectorAll(".table-transactions__type");
    this.amounts = this.mountPoint.querySelectorAll(
      ".table-transactions__amount"
    );
    this.descs = this.mountPoint.querySelectorAll(".table-transactions__desc");
    this.tags = this.mountPoint.querySelectorAll(".table-transactions__tag");
    this.accountsNames = this.mountPoint.querySelectorAll(
      ".table-transactions__account-name"
    );
    this.accountsTypes = this.mountPoint.querySelectorAll(
      ".table-transactions__account-type"
    );
    this.accountsCurrencies = this.mountPoint.querySelectorAll(
      ".table-transactions__account-currency"
    );
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
