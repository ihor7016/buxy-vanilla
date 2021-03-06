import template from "./table-transactions.html";
import templateRow from "./table-transactions-tr.html";

import { ButtonMoreComponent } from "../button-more/button-more";
import { ConfirmDialogComponent } from "../../dialogs/confirm-dialog/confirm-dialog";
import { TransactionDialogComponent } from "../../dialogs/transaction-dialog/transaction-dialog";

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
    this.editTransactionDialogMountPoint = this.mountPoint.querySelector(
      ".table-transactions__edit-transaction-dialog"
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
      this.makeRow(data) + this.transactionPoint.innerHTML;
    this.initMoreBtns();
  }

  delTransaction(elem) {
    const id = elem.dataset.id;
    this.props.onDataDelete(id);
    this.transactionPoint.removeChild(elem);
  }

  editTransaction(newData) {
    const id = this.rowToEdit.dataset.id;
    this.props.onDataEdit(id, newData);
    this.rowToEdit.outerHTML = this.makeRow(newData);
    this.initMoreBtns();
  }

  makeRow(data) {
    return templateRow({ row: data });
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
    this.editTransactionDialogComponent = new TransactionDialogComponent(
      this.editTransactionDialogMountPoint,
      {
        onDialogSubmit: this.handleEditSubmit.bind(this),
        type: "Edit"
      }
    );
    this.editTransactionDialogComponent.mount();
  }

  handleEditSubmit(data) {
    this.editTransaction(data);
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

  handleEditClick(e) {
    this.rowToEdit = e.target.closest(".table-transactions__tr");
    this.editTransactionDialogComponent.showDialog(
      this.getDataToEdit(this.rowToEdit)
    );
  }

  getDataToEdit(row) {
    return {
      date: row.querySelector(".table-transactions__date").innerText,
      type: row.querySelector(".table-transactions__type").innerText,
      amount: row.querySelector(".table-transactions__amount").innerText,
      desc: row.querySelector(".table-transactions__td--desc").innerText,
      tag: row.querySelector(".table-transactions__tag").innerText,
      account: row.querySelector(".table-transactions__account").innerText
    };
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
