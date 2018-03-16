import template from "./table-transactions.html";

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
    data.isIncome ? (data.isIncome = "+") : (data.isIncome = "-");
    const accountInfo = data.account.split(", ");
    const acc = {
      name: accountInfo[0],
      currency: accountInfo[1],
      type: accountInfo[2]
    };
    this.addTransaction({
      date: data.date,
      type: data.isIncome,
      amount: data.amount,
      desc: data.desc,
      tag: data.tag,
      account: acc
    });
    this.handleDataChange();
  }

  addStoredTransactions(list) {
    if (list) list.forEach(row => this.addTransaction(row));
    this.handleDataChange();
  }

  addTransaction(row) {
    this.transactionPoint.innerHTML = `
    <tr class="table-transactions__tr table-transactions__highlighted">
      <td class="table-transactions__td table-transactions__date">${
        row.date
      }</td>
      <td class="table-transactions__td">
        <span class="table-transactions__type">${row.type}</span>
        <span class="table-transactions__amount">${row.amount}</span>
        <span class="table-transactions__account-currency">${
          row.account.currency
        }</span>
      </td>
      <td class="table-transactions__td table-transactions__desc">${
        row.desc
      }</td>
      <td class="table-transactions__td table-transactions__tag">${row.tag}</td>
      <td class="table-transactions__td">
        <span class="table-transactions__span table-transactions__account-name">${
          row.account.name
        }</span>,
        <span class="table-transactions__span table-transactions__account-type">${
          row.account.type
        }</span>
        <div class="table-transactions__more-button"></div>
      </td>
    </tr>
    ${this.transactionPoint.innerHTML}`;
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
        type: this.types[i].innerText,
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
