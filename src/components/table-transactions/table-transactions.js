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

  addTransaction(isIncome, date, amount, desc, tag, account) {
    isIncome ? (amount = "+ " + amount) : (amount = "- " + amount);
    this.transactionPoint.innerHTML += `
    <tr class="table-transactions__tr table-transactions__highlighted">
      <td class="table-transactions__td table-transactions__date">${date}</td>
      <td class="table-transactions__td table-transactions__amount">${amount}</td>
      <td class="table-transactions__td table-transactions__desc">${desc}</td>
      <td class="table-transactions__td table-transactions__tag">${tag}</td>
      <td class="table-transactions__td">
        <span class="table-transactions__span table-transactions__account">${account}</span>
        <button class="table-transactions__button mdc-button">
          <i class="material-icons mdc-button__icon table-transactions__icon">more_vert</i>
        </button>
      </td>
    </tr>
    `;
    this.handleDataChange();
  }

  getTransactionsData() {
    let transactionsList = [];
    let dates = this.mountPoint.querySelectorAll(".table-transactions__date");
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
        amount: amounts[i].innerText,
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
    console.log(this.getTransactionsData());
  }
}
