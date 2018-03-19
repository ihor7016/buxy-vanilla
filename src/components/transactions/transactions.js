import template from "./transactions.html";

import { PieChartComponent } from "../pie-chart/pie-chart";
import { BarChartComponent } from "../bar-chart/bar-chart";
import { TableTransactionsComponent } from "../table-transactions/table-transactions";
import { AddTransactionComponent } from "../add-transaction-dialog/add-transaction-dialog";

import { TransactionListService } from "../../services/transaction-service";

export class TransactionsComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  getStoredData() {
    TransactionListService.get()
      .then(list => this.showStoredTransactions(list))
      .catch(e => console.error(`get transactions: ${e.message}`));
  }

  setStoredData(data) {
    this.list.unshift(data);
    TransactionListService.set(this.list).catch(e =>
      console.error(`set transactions: ${e.message}`)
    );
  }

  showStoredTransactions(list) {
    this.list = list || [];
    this.toggleEmptyState();
    this.tableTransactionsComponent.addStoredTransactions(this.list);
    this.barChartComponent.createFromList(this.list);
    this.pieChartComponent.createFromList(this.list);
  }

  handleAddTransactionSubmit(data) {
    this.tableTransactionsComponent.addTransaction(data);
    this.barChartComponent.update(data);
    this.pieChartComponent.update(data);
    this.setStoredData(data);
    this.toggleEmptyState();
  }

  handleAddTransactionClick() {
    this.addTransactionDialogComponent.showDialog();
  }

  toggleEmptyState() {
    if (!this.list.length) {
      this.transactionsContent.style.display = "none";
      this.emptyState.style.display = "block";
    } else {
      this.transactionsContent.style.display = "block";
      this.emptyState.style.display = "none";
    }
  }

  querySelectors() {
    this.tableTransactionsMountPoint = this.mountPoint.querySelector(
      ".transactions__table-transactions"
    );
    this.pieChartMountPoint = this.mountPoint.querySelector(
      ".transactions__pie-chart"
    );
    this.barChartMountPoint = this.mountPoint.querySelector(
      ".transactions__bar-chart"
    );
    this.addTransactionButton = this.mountPoint.querySelector(
      ".transactions__add-transaction-dialog-activation"
    );
    this.addTransactionDialogMountPoint = this.mountPoint.querySelector(
      ".transactions__add-transaction-dialog"
    );
    this.transactionsContent = this.mountPoint.querySelector(
      ".transactions__content"
    );
    this.emptyState = this.mountPoint.querySelector(
      ".transactions__empty-state"
    );
  }

  addEventListeners() {
    this.addTransactionButton.addEventListener(
      "click",
      this.handleAddTransactionClick.bind(this)
    );
  }

  mountChildren() {
    this.tableTransactionsComponent = new TableTransactionsComponent(
      this.tableTransactionsMountPoint
    );
    this.tableTransactionsComponent.mount();
    this.pieChartComponent = new PieChartComponent(this.pieChartMountPoint);
    this.pieChartComponent.mount();
    this.barChartComponent = new BarChartComponent(this.barChartMountPoint);
    this.barChartComponent.mount();
    this.addTransactionDialogComponent = new AddTransactionComponent(
      this.addTransactionDialogMountPoint,
      {
        addTransaction: this.handleAddTransactionSubmit.bind(this)
      }
    );
    this.addTransactionDialogComponent.mount();
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.mountChildren();
    this.addEventListeners();
    this.getStoredData();
  }
}
