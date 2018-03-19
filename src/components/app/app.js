import template from "./app.html";

import { DrawerComponent } from "../drawer/drawer";
import { ToolbarComponent } from "../toolbar/toolbar";
import { TransactionsComponent } from "../transactions/transactions";
import { AddAccountComponent } from "../add-account-dialog/add-account-dialog";
import { AddTagComponent } from "../add-tag-dialog/add-tag-dialog";
import { AboutComponent } from "../about-dialog/about-dialog";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog";

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
    this.confirmDialogMountPoint = this.mountPoint.querySelector(
      ".app__confirm-dialog"
    );
  }

  mountChildren() {
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
    this.transactionsComponent = new TransactionsComponent(
      this.transactionsMountPoint
    );
    this.transactionsComponent.mount();
    this.addAccountDialog = new AddAccountComponent(this.addAccountMountPoint);
    this.addAccountDialog.mount();
    this.addTagDialog = new AddTagComponent(this.addTagMountPoint);
    this.addTagDialog.mount();
    this.aboutDialog = new AboutComponent(this.aboutMountPoint);
    this.aboutDialog.mount();
    this.confirmDialog = new ConfirmDialogComponent(
      this.confirmDialogMountPoint
    );
    this.confirmDialog.mount();
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

  handleConfirmOnclick() {
    this.confirmDialog.showDialog();
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.mountChildren();
  }
}
