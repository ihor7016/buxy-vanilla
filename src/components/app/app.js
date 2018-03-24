import template from "./app.html";

import { DrawerComponent } from "../drawer/drawer";
import { ToolbarComponent } from "../toolbar/toolbar";
import { TransactionsComponent } from "../transactions/transactions";

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
  }

  mountChildren() {
    this.toolBarComponent = new ToolbarComponent(this.toolbarMountPoint, {
      onMenuClick: this.handleToolbarMenuClick.bind(this)
    });
    this.toolBarComponent.mount();
    this.drawerComponent = new DrawerComponent(this.drawerMountPoint, {
      onAccountDelete: this.handleAccountDelete.bind(this),
      onAccountUpdate: this.handleAccountUpdate.bind(this)
    });
    this.drawerComponent.mount();
    this.transactionsComponent = new TransactionsComponent(
      this.transactionsMountPoint,
      {
        onTransactionAdded: this.handleTransactionAdded.bind(this),
        onTransactionDelete: this.handleTransactionDelete.bind(this)
      }
    );
    this.transactionsComponent.mount();
  }

  handleAccountDelete() {
    this.transactionsComponent.loadStoredData();
  }

  handleAccountUpdate() {
    this.transactionsComponent.loadStoredData();
  }

  handleTransactionAdded(data) {
    this.drawerComponent.updateAccountData(data);
  }

  handleTransactionDelete(data) {
    this.drawerComponent.updateAccountDataDelete(data);
  }

  handleToolbarMenuClick() {
    this.drawerComponent.toggleDrawer();
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.mountChildren();
  }
}
