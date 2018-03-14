import template from "./table-transactions.html";

export class TableTransactionsComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.transactionPoint = this.mountPoint.querySelector(
      ".table-transaction__tbody"
    );
  }

  addTransaction(isIncome, date, amount, desc, tag, account) {
    isIncome ? (amount = "+" + amount) : (amount = "-" + amount);
    this.transactionPoint.innerHTML += `
    <tr class="table-transactions__tr table-transactions__highlighted">
      <td class="table-transactions__td">${date}</td>
      <td class="table-transactions__td">${amount}</td>
      <td class="table-transactions__td">${desc}</td>
      <td class="table-transactions__td">${tag}</td>
      <td class="table-transactions__td">
        <span class="table-transactions__span">${account}</span>
        <button class="table-transactions__button mdc-button">
          <i class="material-icons mdc-button__icon table-transactions__icon">more_vert</i>
        </button>
      </td>
    </tr>
    `;
  }

  getTransactionsData() {}

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
  }
}
