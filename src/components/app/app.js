import template from "./app.html";

import { DrawerComponent } from "../drawer/drawer";
import { ToolbarComponent } from "../toolbar/toolbar";
import { TransactionsComponent } from "../transactions/transactions";
import { AddTagComponent } from "../add-tag-dialog/add-tag-dialog";
import { AboutComponent } from "../about-dialog/about-dialog";
import { AddAccountDialogComponent } from "../accounts/add-account-dialog/add-account-dialog";
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
  }

  mountChildren() {
    this.toolBarComponent = new ToolbarComponent(this.toolbarMountPoint, {
      onMenuClick: this.handleToolbarMenuClick.bind(this)
    });
    this.toolBarComponent.mount();
    this.initDrawer();
    this.initAddAccountDialogComponent();
    this.initAccountComponent();
    this.addTagDialog = new AddTagComponent(this.addTagMountPoint);
    this.addTagDialog.mount();
    this.aboutDialog = new AboutComponent(this.aboutMountPoint);
    this.aboutDialog.mount();
    this.transactionsComponent = new TransactionsComponent(
      this.transactionsMountPoint
    );
    this.transactionsComponent.mount();
  }

  initDrawer() {
    this.drawerComponent = new DrawerComponent(this.drawerMountPoint, {
      onAddTagClick: this.handleAddTagOnclick.bind(this)
    });
    this.drawerComponent.mount();
  }

  initAddAccountDialogComponent() {
    this.addAccountDialogComponent = new AddAccountDialogComponent(
      this.addAccountMountPoint,
      {
        onAddAccountConfirmed: this.handleAddAccountConfirmed.bind(this)
      }
    );
    this.addAccountDialogComponent.mount();
  }

  initAccountComponent() {
    this.accountsComponent = new AccountsComponent(
      this.drawerComponent.getAccountsMountPoint(),
      {
        onAddAccountClicked: this.handleAddAccountClicked.bind(this)
      }
    );
    this.accountsComponent.mount();
  }

  handleAddAccountClicked() {
    this.addAccountDialogComponent.showDialog();
  }

  handleAddAccountConfirmed(account) {
    this.accountsComponent.handleAddAccountConfirmed(account);
    this.transactionsComponent.mount();
    this.addAccountDialog = new AddAccountComponent(this.addAccountMountPoint);
    this.addAccountDialog.mount();
    this.addTagDialog = new AddTagComponent(this.addTagMountPoint);
    this.addTagDialog.mount();
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
    this.mountChildren();
  }
}
