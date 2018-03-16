import template from "./app.html";

import { DrawerComponent } from "../drawer/drawer";
import { ToolbarComponent } from "../toolbar/toolbar";
import { TransactionsComponent } from "../transactions/transactions";
import { AddAccountComponent } from "../add-account-dialog/add-account-dialog";
import { AddTagComponent } from "../add-tag-dialog/add-tag-dialog";
import { AboutComponent } from "../about-dialog/about-dialog";
import { PieChartComponent } from "../pie-chart/pie-chart";
import { BarChartComponent } from "../bar-chart/bar-chart";
import { TableTransactionsComponent } from "../table-transactions/table-transactions";
import { StorageService } from "../../services/storage";
import { Account } from "../../services/model/account";

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
    this.addAccountDialog = new AddAccountComponent(this.addAccountMountPoint, {
      onAddAccountConfirmed: this.handleAddAccountConfirmed.bind(this)
    });

    this.addAccountDialog.mount();
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

  getCurrentAccounts() {
    StorageService.get("accounts").then(accounts => {
      if (!accounts) {
        accounts = [
          new Account("Privat", "", "UAH"),
          new Account("Payoneer", "", "USD")
        ];
        StorageService.set("accounts", accounts);
      }
      this.initDrawer(accounts);
      this.mountTransactionsComponent(accounts);
    });
  }

  initDrawer(accounts) {
    this.drawerComponent = new DrawerComponent(this.drawerMountPoint, {
      onAddAccountClick: this.handleAddAccountClick.bind(this),
      onAddTagClick: this.handleAddTagOnclick.bind(this),
      accounts: accounts
    });
    this.drawerComponent.mount();
  }

  handleAddAccountConfirmed(account) {
    StorageService.get("accounts").then(accounts => {
      if (!accounts) {
        StorageService.set("accounts", [account]);
      } else {
        accounts.unshift(account);
        StorageService.set("accounts", accounts);
      }
    });
    this.drawerComponent.addAccount(account);
  }

  handleToolbarMenuClick() {
    this.drawerComponent.toggleDrawer();
  }

  handleAboutOnclick() {
    this.aboutDialog.showDialog();
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
    this.getCurrentAccounts();
    this.mountChildren();
  }
}
