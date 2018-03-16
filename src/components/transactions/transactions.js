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

  initServices() {
    this.transactionListService = new TransactionListService();
  }

  getStoredData() {
    this.transactionListService.get().then(
      list => {
        if (list) this.showStoredTransactions(list);
      },
      error => console.error(`get transactions: ${error.message}`)
    );
  }

  setStoredData(data) {
    this.list.push(data);
    this.transactionListService
      .set(this.list)
      .then(
        () => {},
        error => console.error(`set transactions: ${error.message}`)
      );
  }

  showStoredTransactions(list) {
    this.list = list;
    this.tableTransactionsComponent.addStoredTransactions(list);
    this.barChartComponent.createFromList(list);
    this.pieChartComponent.createFromList(list);
  }

  handleAddTransactionSubmit(data) {
    this.tableTransactionsComponent.addTransaction(data);
    this.barChartComponent.updateChart(data);
    this.pieChartComponent.updateChart(data);
    this.setStoredData(data);
  }

  handleAddTransactionClick() {
    this.addTransactionDialogComponent.showDialog();
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
    this.addEventListeners();
    this.mountChildren();
    this.initServices();
    this.getStoredData();
  }
}
