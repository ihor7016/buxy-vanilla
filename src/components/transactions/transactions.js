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
    TransactionListService.get().then(list =>
      this.showStoredTransactions(list)
    );
  }

  addStoredData(data) {
    TransactionListService.add(data);
  }

  delStoredData(id) {
    TransactionListService.del(id).then(list =>
      this.showStoredTransactions(list)
    );
  }

  showStoredTransactions(storedList) {
    if (storedList && storedList.length) {
      this.tableTransactionsComponent.addStoredTransactions(storedList);
      this.barChartComponent.createFromList(storedList);
      this.pieChartComponent.createFromList(storedList);
    } else {
      this.showEmptyState();
    }
  }

  handleAddTransactionSubmit(data) {
    this.tableTransactionsComponent.addTransaction(data);
    this.barChartComponent.update(data);
    this.pieChartComponent.update(data);
    this.addStoredData(data);
    this.props.onTransactionAdded(data);
    this.hideEmptyState();
  }

  handleTransactionDelete(id) {
    this.delStoredData(id);
  }

  handleAddTransactionClick() {
    this.addTransactionDialogComponent.showDialog();
  }

  showEmptyState() {
    this.transactionsContent.classList.add("transactions__block--hidden");
    this.emptyState.classList.remove("transactions__block--hidden");
  }

  hideEmptyState() {
    this.transactionsContent.classList.remove("transactions__block--hidden");
    this.emptyState.classList.add("transactions__block--hidden");
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
    this.getStoredData();
  }
}
