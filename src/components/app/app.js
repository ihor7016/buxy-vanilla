import template from "./app.html";

import { DrawerComponent } from "../drawer/drawer";
import { ToolbarComponent } from "../toolbar/toolbar";
import { AddTransactionComponent } from "../add-transaction-dialog/add-transaction-dialog";
import { AddAccountComponent } from "../add-account-dialog/add-account-dialog";
import { AddTagComponent } from "../add-tag-dialog/add-tag-dialog";
import { BarChartComponent } from "../bar-chart/bar-chart";

export class AppComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
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
    this.barChartPoint = this.mountPoint.querySelector(".app__bar-chart");
    // only for test. remove before merging
    this.barChartPoint1 = this.mountPoint.querySelector(".app__bar-chart1");
  }

  addEventListeners() {
    this.addTransactionButton.addEventListener(
      "click",
      this.handleAddTransactionClick.bind(this)
    );
  }

  mountChildren() {
    this.toolBarComponent = new ToolbarComponent(this.toolbarMountPoint, {
      onMenuClicked: this.handleToolbarMenuClick.bind(this)
    });
    this.toolBarComponent.mount();
    this.drawerComponent = new DrawerComponent(this.drawerMountPoint, {
      onAddAccountClick: this.handleAddAccountClick.bind(this),
      onAddTagClick: this.handleAddTagOnclick.bind(this)
    });
    this.drawerComponent.mount();
    this.addTransactionDialog = new AddTransactionComponent(
      this.addTransactionDialogPoint
    );
    this.addTransactionDialog.mount();
    this.addAccountDialog = new AddAccountComponent(this.addAccountMountPoint);
    this.addAccountDialog.mount();
    this.addTagDialog = new AddTagComponent(this.addTagMountPoint);
    this.addTagDialog.mount();
    this.barChart = new BarChartComponent(this.barChartPoint);
    this.barChart.mount();
    // only for test. remove before merging
    this.barChart1 = new BarChartComponent(this.barChartPoint1);
    this.barChart1.mount();
  }

  handleToolbarMenuClick() {
    this.drawerComponent.toggleDrawer();
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
  }
}
