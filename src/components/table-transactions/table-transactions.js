import template from "./table-transactions.html";
import templateRow from "./table-transactions-tr.html";

import { ButtonMoreComponent } from "../button-more/button-more";

export class TableTransactionsComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.transactionPoint = this.mountPoint.querySelector(
      ".table-transaction__tbody"
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

  handleDeleteClick(e) {
    this.delTransaction(e.target.closest(".table-transactions__tr"));
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
  }
}
