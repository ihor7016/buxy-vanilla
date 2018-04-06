import template from "./transactions.html";

import { PieChartComponent } from "../../charts/pie-chart/pie-chart";
import { BarChartComponent } from "../../charts/bar-chart/bar-chart";
import { TableTransactionsComponent } from "../table-transactions/table-transactions";
import { TransactionDialogComponent } from "../../dialogs/transaction-dialog/transaction-dialog";

import { TransactionListService } from "../../../services/models/transaction-service";

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
    TransactionListService.del(id).then(list => this.updateList(list));
  }

  editStoredData(oldId, newData) {
    TransactionListService.update(oldId, newData).then(list =>
      this.updateList(list)
    );
  }

  updateList(newList) {
    this.list = newList;
    this.checkEmptyState();
  }

  showStoredTransactions(storedList) {
    if (storedList) {
      this.updateList(storedList);
      this.tableTransactionsComponent.addStoredTransactions(storedList);
      this.barChartComponent.createFromList(storedList);
      this.pieChartComponent.createFromList(storedList);
    }
    this.checkEmptyState();
  }

  handleAddTransactionSubmit(data) {
    this.tableTransactionsComponent.addTransaction(data);
    this.barChartComponent.updateAdd(data);
    this.pieChartComponent.updateAdd(data);
    this.addStoredData(data);
    this.props.onTransactionAdded(data);
  }

  handleTransactionDelete(id) {
    const data = this.list.find(elem => elem.id === id);
    this.props.onTransactionDelete(data);
    this.barChartComponent.updateDel(data);
    this.pieChartComponent.updateDel(data);
    this.delStoredData(id);
  }

  handleTransacitonEdit(oldId, newData) {
    const oldData = this.list.find(elem => elem.id === oldId);
    this.props.onTransactionEdit(oldData, newData);
    this.barChartComponent.updateEdit(oldData, newData);
    this.pieChartComponent.updateEdit(oldData, newData);
    this.editStoredData(oldId, newData);
  }

  handleAddTransactionClick() {
    this.addTransactionDialogComponent.showDialog();
  }

  checkEmptyState() {
    if (this.list.length) {
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
        onDataDelete: this.handleTransactionDelete.bind(this),
        onDataEdit: this.handleTransacitonEdit.bind(this)
      }
    );
    this.tableTransactionsComponent.mount();
    this.pieChartComponent = new PieChartComponent(this.pieChartMountPoint);
    this.pieChartComponent.mount();
    this.barChartComponent = new BarChartComponent(this.barChartMountPoint);
    this.barChartComponent.mount();
    this.addTransactionDialogComponent = new TransactionDialogComponent(
      this.addTransactionDialogMountPoint,
      {
        onDialogSubmit: this.handleAddTransactionSubmit.bind(this),
        type: "Add"
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
