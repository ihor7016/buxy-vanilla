import template from "./transactions.html";

import { PieChartComponent } from "../pie-chart/pie-chart";
import { BarChartComponent } from "../bar-chart/bar-chart";
import { TableTransactionsComponent } from "../table-transactions/table-transactions";
import { AddTransactionComponent } from "../add-transaction-dialog/add-transaction-dialog";

export class TransactionsComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
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
    this.addTransactionDialog = new AddTransactionComponent(
      this.addTransactionDialogMountPoint
    );
    this.addTransactionDialog.mount();
  }

  handleAddTransactionClick() {
    this.addTransactionDialog.showDialog();
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.addEventListeners();
    this.mountChildren();
  }
}