import template from "./table-transactions.html";

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

  addTransactionFromDialog(isIncome, date, amount, desc, tag, account) {
    isIncome ? (isIncome = "+") : (isIncome = "-");
    this.addTransaction({
      date: date,
      type: isIncome,
      amount: amount,
      desc: desc,
      tag: tag,
      account: account
    });
    this.handleDataChange();
  }

  addStoredTransactions(list) {
    if (list) list.forEach(row => this.addTransaction(row));
    this.handleDataChange();
  }

  addTransaction(row) {
    this.transactionPoint.innerHTML += `
    <tr class="table-transactions__tr table-transactions__highlighted">
      <td class="table-transactions__td table-transactions__date">${
        row.date
      }</td>
      <td class="table-transactions__td">
        <span class="table-transactions__type">${row.type}</span>
        <span class="table-transactions__amount">${row.amount}</span>
      </td>
      <td class="table-transactions__td table-transactions__desc">${
        row.desc
      }</td>
      <td class="table-transactions__td table-transactions__tag">${row.tag}</td>
      <td class="table-transactions__td">
        <span class="table-transactions__span table-transactions__account">${
          row.account
        }</span>
        <button class="table-transactions__button mdc-button">
          <i class="material-icons mdc-button__icon table-transactions__icon">more_vert</i>
        </button>
      </td>
    </tr>
    `;
  }

  getTransactionsData() {
    let transactionsList = [];
    let dates = this.mountPoint.querySelectorAll(".table-transactions__date");
    let types = this.mountPoint.querySelectorAll(".table-transactions__type");
    let amounts = this.mountPoint.querySelectorAll(
      ".table-transactions__amount"
    );
    let descs = this.mountPoint.querySelectorAll(".table-transactions__desc");
    let tags = this.mountPoint.querySelectorAll(".table-transactions__tag");
    let accounts = this.mountPoint.querySelectorAll(
      ".table-transactions__account"
    );
    for (let i = 0; i < dates.length; i++) {
      transactionsList.push({
        date: dates[i].innerText,
        type: types[i].innerText,
        amount: parseInt(amounts[i].innerText),
        desc: descs[i].innerText,
        tag: tags[i].innerText,
        account: accounts[i].innerText
      });
    }
    return transactionsList;
  }

  handleDataChange() {
    this.props.onDataChange(this.getTransactionsData());
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
  }
}
