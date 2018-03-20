import template from "./table-transactions.html";
import templateRow from "./table-transactions-tr.html";

import { ButtonMoreComponent } from "../button-more/button-more";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog";

export class TableTransactionsComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.transactionPoint = this.mountPoint.querySelector(
      ".table-transaction__tbody"
    );

    this.confirmDialogMountPoint = this.mountPoint.querySelector(
      ".table-transactions__confirm-dialog"
    );
  }

  addStoredTransactions(list) {
    const html = list
      ? list.map(data => templateRow({ row: data })).join("")
      : "";
    this.transactionPoint.innerHTML = html;
    this.initMoreBtns();
  }

  addTransaction(data) {
    this.transactionPoint.innerHTML =
      templateRow({
        row: data
      }) + this.transactionPoint.innerHTML;
    this.initMoreBtns();
  }

  querySelectorsButtons() {
    this.moreBtnMountPoints = this.mountPoint.querySelectorAll(
      ".table-transactions__more-button"
    );
  }

  mountChildren() {
    this.confirmDialog = new ConfirmDialogComponent(
      this.confirmDialogMountPoint,
      {
        type: "transaction",
        name: "name"
      }
    );
    this.confirmDialog.mount();
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
    this.confirmDialog.showDialog();
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.mountChildren();
    this.initMoreBtns();
  }
}
