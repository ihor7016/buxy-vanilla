import template from "./app.html";

import { DrawerComponent } from "../drawer/drawer";
import { ToolbarComponent } from "../toolbar/toolbar";
import { AddTransactionComponent } from "../add-transaction-dialog/add-transaction-dialog";
import { AddAccountComponent } from "../add-account-dialog/add-account-dialog";
import { AddTagComponent } from "../add-tag-dialog/add-tag-dialog";
import { AboutComponent } from "../about-dialog/about-dialog";
import { PieChartComponent } from "../pie-chart/pie-chart";
import { BarChartComponent } from "../bar-chart/bar-chart";
import { TableTransactionsComponent } from "../table-transactions/table-transactions";

import { TransactionListService } from "../../services/transaction-service";

export class AppComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.tableTransactionsMountPoint = this.mountPoint.querySelector(
      ".app__table-transactions"
    );
    this.toolbarMountPoint = this.mountPoint.querySelector(
      ".app__container-toolbar-point"
    );
    this.drawerMountPoint = this.mountPoint.querySelector(".app__drawer-point");
    this.addTransactionButton = this.mountPoint.querySelector(
      ".app__add-transaction-dialog-activation"
    );
    this.addTransactionDialogPoint = this.mountPoint.querySelector(
      ".app__add-transaction-dialog"
    );
    this.addAccountMountPoint = this.mountPoint.querySelector(
      ".app__add-account-dialog"
    );
    this.addTagMountPoint = this.mountPoint.querySelector(
      ".app__add-tag-dialog"
    );
    this.aboutMountPoint = this.mountPoint.querySelector(".app__about-dialog");
    this.pieChartPoint = this.mountPoint.querySelector(".app__pie-chart");
    this.barChartPoint = this.mountPoint.querySelector(".app__bar-chart");
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
      { onDataChange: this.handleTransactionListChange.bind(this) }
    );
    this.tableTransactionsComponent.mount();
    this.toolBarComponent = new ToolbarComponent(this.toolbarMountPoint, {
      onMenuClicked: this.handleToolbarMenuClick.bind(this),
      onAboutClick: this.handleAboutOnclick.bind(this)
    });
    this.toolBarComponent.mount();
    this.drawerComponent = new DrawerComponent(this.drawerMountPoint, {
      onAddAccountClick: this.handleAddAccountClick.bind(this),
      onAddTagClick: this.handleAddTagOnclick.bind(this)
    });
    this.drawerComponent.mount();
    this.addTransactionDialog = new AddTransactionComponent(
      this.addTransactionDialogPoint,
      { addTransaction: this.handleAddTransactionSubmit.bind(this) }
    );
    this.addTransactionDialog.mount();
    this.addAccountDialog = new AddAccountComponent(this.addAccountMountPoint);
    this.addAccountDialog.mount();
    this.addTagDialog = new AddTagComponent(this.addTagMountPoint);
    this.addTagDialog.mount();
    this.aboutDialog = new AboutComponent(this.aboutMountPoint);
    this.aboutDialog.mount();
    this.pieChart = new PieChartComponent(this.pieChartPoint);
    this.pieChart.mount();
    this.barChart = new BarChartComponent(this.barChartPoint);
    this.barChart.mount();
  }

  initServices() {
    this.transactionListService = new TransactionListService({
      returnList: this.sendStoredTransactionList.bind(this)
    });
  }

  /// ??? try to find another way
  addStoredData() {
    this.transactionListService.get();
  }

  /// ??? try to find another way
  sendStoredTransactionList(list) {
    this.tableTransactionsComponent.addStoredTransactions(list);
  }

  handleAddTransactionSubmit(isIncome, date, amount, desc, tag, account) {
    this.tableTransactionsComponent.addTransactionFromDialog(
      isIncome,
      date,
      amount,
      desc,
      tag,
      account
    );
  }

  handleTransactionListChange(list) {
    this.transactionListService.set(list);
  }

  handleToolbarMenuClick() {
    this.drawerComponent.toggleDrawer();
  }

  handleAboutOnclick() {
    this.aboutDialog.showDialog();
  }

  handleAddTransactionClick() {
    this.addTransactionDialog.showDialog();
  }

  handleAddAccountClick() {
    this.addAccountDialog.showDialog();
  }

  handleAddTagOnclick() {
    this.addTagDialog.showDialog();
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.addEventListeners();
    this.mountChildren();
    this.initServices();
    this.addStoredData();
  }
}
