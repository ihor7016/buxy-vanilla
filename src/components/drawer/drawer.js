import template from "./drawer.html";
import { MDCPersistentDrawer } from "@material/drawer";
import { ButtonMoreComponent } from "../button-more/button-more";
import { AccountsComponent } from "../accounts/accounts-component/accounts-component";

export class DrawerComponent {
  constructor(mountPoint, dialogMountPoint, props) {
    this.mountPoint = mountPoint;
    this.dialogMountPoint = dialogMountPoint;
    this.props = props;
  }

  querySelectors() {
    this.drawerRoot = this.mountPoint.querySelector(".mdc-drawer--persistent");
    this.menu = this.mountPoint.querySelector(".toolbar__menu");
    this.addTagButton = this.mountPoint.querySelector(
      ".drawer__add-tag-dialog-activation"
    );
    this.accountsMountPoint = this.mountPoint.querySelector(
      ".drawer__accounts-mountpoint"
    );
  }

  initMDC() {
    this.drawer = new MDCPersistentDrawer(this.drawerRoot);
  }

  initAccounts(accounts) {
    accounts.forEach(item => {
      this.addAccount(item);
    });
  }

  mountChildren() {
    this.accountsComponent = new AccountsComponent(
      this.accountsMountPoint,
      this.dialogMountPoint,
      {
        onAddAccountConfirmed: this.onAddAccountConfirmed.bind(this)
      }
    );
    this.accountsComponent.mount();
  }

  onAddAccountConfirmed(account) {
    this.addAccount(account);
  }

  addAccount(account) {
    this.accountsComponent.addAccountToHead(account);
  }

  addEventListeners() {
    this.addTagButton.addEventListener(
      "click",
      this.handleAddTagOnclick.bind(this)
    );
  }

  handleEditClick() {
    console.log("handleEditClick");
  }

  handleDeleteClick() {
    console.log("handleDeleteClick");
  }

  handleAddTagOnclick() {
    this.props.onAddTagClick();
  }

  toggleDrawer() {
    this.drawer.open = !this.drawer.open;
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.initMDC();
    this.mountChildren();
    this.addEventListeners();
  }
}
