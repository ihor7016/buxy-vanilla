import template from "./table-transactions.html";
import templateRow from "./table-transactions-tr.html";

import { ButtonMoreComponent } from "../button-more/button-more";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog";

export class TableTransactionsComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
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

  delTransaction(elem) {
    const id = elem.dataset.id;
    this.props.onDataDelete(id);
    this.transactionPoint.removeChild(elem);
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
        onOkClick: this.handleDeleteConfirm.bind(this)
      }
    );
    this.confirmDialog.mount();
  }

  handleDeleteConfirm() {
    this.delTransaction(this.rowToDelete);
  }

  initMoreBtns() {
    this.querySelectorsButtons();
    Array.from(this.moreBtnMountPoints).forEach(point => {
      new ButtonMoreComponent(point, {
        position: "left",
        onDeleteClick: this.handleDeleteClick.bind(this),
        onEditClick: this.handleEditClick.bind(this)
      }).mount();
    });
  }

  handleEditClick() {
    console.log("handleEditClick");
  }

  handleDeleteClick(e) {
    this.rowToDelete = e.target.closest(".table-transactions__tr");
    const elemDescription = this.rowToDelete.querySelector(
      ".table-transactions__td--desc"
    ).innerHTML;
    this.confirmDialog.showDialog("transaction", elemDescription);
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.mountChildren();
  }
}
