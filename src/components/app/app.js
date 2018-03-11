import template from "./app.html";
import { AddAccountComponent } from "../add-account-dialog/add-account-dialog";

import { DrawerComponent } from "../drawer/drawer";
import { ToolbarComponent } from "../toolbar/toolbar";
import { AddTransactionComponent } from "../add-transaction-dialog/add-transaction-dialog";

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
    this.drawerComponent = new DrawerComponent(this.drawerMountPoint);
    this.drawerComponent.mount();
    this.addTransacionDialog = new AddTransactionComponent(
      this.addTransactionDialogPoint
    );
    this.addTransacionDialog.mount();
    this.addAccountDialog = new AddAccountComponent(this.addAccountMountPoint);
    this.addAccountDialog.mount();
  }

  handleToolbarMenuClick() {
    this.drawerComponent.toggleDrawer();
  }

  handleAddTransactionClick() {
    this.addTransacionDialog.showDialog();
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.addEventListeners();
    this.mountChildren();
  }
}
