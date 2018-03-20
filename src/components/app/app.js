import template from "./app.html";

import { DrawerComponent } from "../drawer/drawer";
import { ToolbarComponent } from "../toolbar/toolbar";
import { TransactionsComponent } from "../transactions/transactions";
import { AddTagComponent } from "../add-tag-dialog/add-tag-dialog";
import { AccountsComponent } from "../accounts/accounts/accounts";

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
    this.addTagMountPoint = this.mountPoint.querySelector(
      ".app__add-tag-dialog"
    );
  }

  mountChildren() {
    this.toolBarComponent = new ToolbarComponent(this.toolbarMountPoint, {
      onMenuClick: this.handleToolbarMenuClick.bind(this)
    });
    this.toolBarComponent.mount();
    this.initDrawer();
    this.initAccountComponent();
    this.addTagDialog = new AddTagComponent(this.addTagMountPoint);
    this.addTagDialog.mount();
    this.transactionsComponent = new TransactionsComponent(
      this.transactionsMountPoint,
      {
        onTransactionAdded: this.handleTransactionAdded.bind(this)
      }
    );
    this.transactionsComponent.mount();
  }

  initDrawer() {
    this.drawerComponent = new DrawerComponent(this.drawerMountPoint, {
      onAddTagClick: this.handleAddTagOnclick.bind(this)
    });
    this.drawerComponent.mount();
  }

  initAccountComponent() {
    this.accountsComponent = new AccountsComponent(
      this.drawerComponent.getAccountsMountPoint(),
      {
        onAddAccountConfirmed: this.handleAddAccountConfirmed.bind(this)
      }
    );
    this.accountsComponent.mount();
  }

  handleTransactionAdded(data) {
    this.accountsComponent.updateAccountData(data);
  }

  handleAddAccountConfirmed(account) {
    this.accountsComponent.handleAddAccountConfirmed(account);
    this.transactionsComponent.mount();
    this.addTagDialog = new AddTagComponent(this.addTagMountPoint);
    this.addTagDialog.mount();
  }

  handleToolbarMenuClick() {
    this.drawerComponent.toggleDrawer();
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
