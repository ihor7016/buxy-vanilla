import template from "./app.html";

import { DrawerComponent } from "../drawer/drawer";
import { ToolbarComponent } from "../toolbar/toolbar";
import { TransactionsComponent } from "../data-entry/transaction/transactions/transactions";

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
      onTagDelete: this.handleTagDelete.bind(this),
      onAccountUpdate: this.handleAccountUpdate.bind(this),
      onTagChange: this.handleTagChange.bind(this)
    });
    this.drawerComponent.mount();
    this.transactionsComponent = new TransactionsComponent(
      this.transactionsMountPoint,
      {
        onTransactionAdded: this.handleTransactionAdded.bind(this),
        onTransactionDelete: this.handleTransactionDelete.bind(this),
        onTransactionEdit: this.handleTransactionEdit.bind(this)
      }
    );
    this.transactionsComponent.mount();
  }

  handleTagChange() {
    this.transactionsComponent.loadStoredData();
  }

  handleAccountDelete() {
    this.transactionsComponent.loadStoredData();
  }

  handleTagDelete() {
    this.transactionsComponent.loadStoredData();
  }
  handleAccountUpdate() {
    this.transactionsComponent.loadStoredData();
  }

  handleTransactionAdded(data) {
    this.drawerComponent.updateAccountDataAdd(data);
  }

  handleTransactionDelete(data) {
    this.drawerComponent.updateAccountDataDelete(data);
  }

  handleTransactionEdit(oldData, newData) {
    this.drawerComponent.updateAccountDataEdit(oldData, newData);
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
