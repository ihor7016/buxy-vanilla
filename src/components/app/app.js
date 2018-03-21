import template from "./app.html";

import { DrawerComponent } from "../drawer/drawer";
import { ToolbarComponent } from "../toolbar/toolbar";
import { TransactionsComponent } from "../transactions/transactions";
import { AboutComponent } from "../about-dialog/about-dialog";
import { AddAccountComponent } from "../add-account-dialog/add-account-dialog";
import { AddTagComponent } from "../add-tag-dialog/add-tag-dialog";


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
    this.aboutMountPoint = this.mountPoint.querySelector(".app__about-dialog");
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
    this.addAccountDialog = new AddAccountComponent(this.addAccountMountPoint);
    this.addAccountDialog.mount();

    this.addTagDialog = new AddTagComponent(this.addTagMountPoint);
    this.addTagDialog.mount();
    this.transactionsComponent = new TransactionsComponent(
      this.transactionsMountPoint,
      {
        onTransactionAdded: this.handleTransactionAdded.bind(this)
      }
    );
    this.transactionsComponent.mount();
    this.aboutDialog = new AboutComponent(this.aboutMountPoint);
    this.aboutDialog.mount();
  }

  initDrawer() {
    this.drawerComponent = new DrawerComponent(this.drawerMountPoint, {
      onAddAccountClick: this.handleAddAccountClick.bind(this),
      onAddTagClick: this.handleAddTagOnclick.bind(this)
    });
    this.drawerComponent.mount();
  }

  handleToolbarMenuClick() {
    this.drawerComponent.toggleDrawer();
  }
  handleTransactionAdded(data) {
    this.drawerComponent.updateAccountData(data);
  }

  handleToolbarMenuClick() {
    this.drawerComponent.toggleDrawer();
  }

  handleAboutOnclick() {
    this.aboutDialog.showDialog();
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.mountChildren();
  }
}
