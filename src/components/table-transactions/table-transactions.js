import template from "./table-transactions.html";
import templateRow from "./table-transactions-tr.html";

import { ButtonMoreComponent } from "../button-more/button-more";

import { TransactionListService } from "../../services/transaction-service";

export class TableTransactionsComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  initServices() {
    this.transactionListService = new TransactionListService();
  }

  getStoredData() {
    this.transactionListService.get().then(
      list => {
        this.addStoredTransactions(list);
      },
      error => console.error(`get transactions: ${error.message}`)
    );
  }

  setStoredData(list) {
    this.transactionListService
      .set(list)
      .then(
        () => console.log("ok"),
        error => console.error(`set transactions: ${error.message}`)
      );
  }

  querySelectors() {
    this.transactionPoint = this.mountPoint.querySelector(
      ".table-transaction__tbody"
    );
  }

  addTransactionFromDialog(data) {
    data.type ? (data.type = "+") : (data.type = "-");
    const accountInfo = data.account.split(", ");
    data.account = {
      name: accountInfo[0],
      currency: accountInfo[1],
      type: accountInfo[2]
    };
    this.addTransaction(data);
  }

  addStoredTransactions(list) {
    if (list) list.forEach(row => this.addTransaction(row));
  }

  addTransaction(row) {
    console.log(row);
    this.transactionPoint.innerHTML =
      templateRow({
        row: row
      }) + this.transactionPoint.innerHTML;
    this.handleDataChange();
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

  getTransactionsData() {
    this.querySelectorsTransactions();
    let transactionsList = [];
    for (let i = 0; i < this.dates.length; i++) {
      transactionsList.push({
        date: this.dates[i].innerText,
        type: this.types[i].innerText.replace(/\r|\n|\s/g, ""),
        amount: parseInt(this.amounts[i].innerText),
        desc: this.descs[i].innerText,
        tag: this.tags[i].innerText,
        account: {
          name: this.accountsNames[i].innerText,
          type: this.accountsTypes[i].innerText,
          currency: this.accountsCurrencies[i].innerText
        }
      });
    }
    return transactionsList.reverse();
  }

  handleDataChange() {
    const list = this.getTransactionsData();
    this.setStoredData(list);
    this.props.onDataChange(list);
    this.initMoreBtns();
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
    this.initServices();
    this.getStoredData();
  }
}
