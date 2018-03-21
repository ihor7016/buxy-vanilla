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
    this.list = [];
  }

  loadStoredData() {
    TransactionListService.get().then(list =>
      this.showStoredTransactions(list)
    );
  }

  addStoredData(data) {
    TransactionListService.add(data).then(list => this.updateList(list));
  }

  delStoredData(id) {
    TransactionListService.del(id).then(list => {
      this.updateList(list);
      this.checkEmptyState(list);
    });
  }

  updateList(newList) {
    this.list = newList;
  }

  showStoredTransactions(storedList) {
    this.updateList(storedList);
    this.tableTransactionsComponent.addStoredTransactions(storedList);
    this.barChartComponent.createFromList(storedList);
    this.pieChartComponent.createFromList(storedList);
    this.checkEmptyState(storedList);
  }

  updateCharts(action, data) {
    this.barChartComponent.update(action, data);
    this.pieChartComponent.update(action, data);
  }

  handleAddTransactionSubmit(data) {
    this.tableTransactionsComponent.addTransaction(data);
    this.updateCharts("add", data);
    this.addStoredData(data);
    this.props.onTransactionAdded(data);
    this.checkEmptyState([data]);
  }

  handleTransactionDelete(id) {
    const data = this.list.find(elem => elem.id === id);
    this.props.onTransactionDelete(data);
    this.updateCharts("del", data);
    this.delStoredData(id);
  }

  handleAddTransactionClick() {
    this.addTransactionDialogComponent.showDialog();
  }

  checkEmptyState(list) {
    if (list && list.length) {
      this.transactionsContent.classList.remove("transactions__block--hidden");
      this.emptyState.classList.add("transactions__block--hidden");
    } else {
      this.transactionsContent.classList.add("transactions__block--hidden");
      this.emptyState.classList.remove("transactions__block--hidden");
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
      this.tableTransactionsMountPoint,
      {
        onDataDelete: this.handleTransactionDelete.bind(this)
      }
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
    this.loadStoredData();
  }
}
