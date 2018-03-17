import template from "./app.html";

import { DrawerComponent } from "../drawer/drawer";
import { ToolbarComponent } from "../toolbar/toolbar";
import { TransactionsComponent } from "../transactions/transactions";
import { AddAccountComponent } from "../accounts/add-account-dialog/add-account-dialog";
import { AddTagComponent } from "../add-tag-dialog/add-tag-dialog";
import { AboutComponent } from "../about-dialog/about-dialog";
import { PieChartComponent } from "../pie-chart/pie-chart";
import { BarChartComponent } from "../bar-chart/bar-chart";
import { TableTransactionsComponent } from "../table-transactions/table-transactions";
import { StorageService } from "../../services/storage";
import { AccountsComponent } from "../accounts/accounts-component/accounts-component";

export class AppComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.toolbarMountPoint = this.mountPoint.querySelector(
      ".app__container-toolbar-point"
    );
    this.drawerMountPoint = this.mountPoint.querySelector(".app__drawer-point");
    this.transactionsMountPoint = this.mountPoint.querySelector(
      ".app__container-content"
    );
    this.addAccountMountPoint = this.mountPoint.querySelector(
      ".app__add-account-dialog"
    );
    this.addTagMountPoint = this.mountPoint.querySelector(
      ".app__add-tag-dialog"
    );
    this.aboutMountPoint = this.mountPoint.querySelector(".app__about-dialog");
  }

  mountChildren() {
    this.toolBarComponent = new ToolbarComponent(this.toolbarMountPoint, {
      onMenuClicked: this.handleToolbarMenuClick.bind(this),
      onAboutClick: this.handleAboutOnclick.bind(this)
    });
    this.toolBarComponent.mount();
    this.initDrawer();
    this.addTagDialog = new AddTagComponent(this.addTagMountPoint);
    this.addTagDialog.mount();
    this.aboutDialog = new AboutComponent(this.aboutMountPoint);
    this.aboutDialog.mount();
  }

  mountTransactionsComponent(accounts) {
    this.transactionsComponent = new TransactionsComponent(
      this.transactionsMountPoint,
      { accounts: accounts }
    );
    this.transactionsComponent.mount();
  }

  initDrawer() {
    this.drawerComponent = new DrawerComponent(
      this.drawerMountPoint,
      this.addAccountMountPoint,
      {
        onAddTagClick: this.handleAddTagOnclick.bind(this)
      }
    );
    this.drawerComponent.mount();
  }

  handleToolbarMenuClick() {
    this.drawerComponent.toggleDrawer();
  }

  handleAboutOnclick() {
    this.aboutDialog.showDialog();
  }

  handleAddTagOnclick() {
    this.addTagDialog.showDialog();
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.mountChildren();
  }
}
