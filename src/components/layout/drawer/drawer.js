import template from "./drawer.html";
import { MDCPersistentDrawer } from "@material/drawer";
import { AccountsComponent } from "../../ui/accounts/accounts";
import { TagsComponent } from "../../ui/tags/tags";

export class DrawerComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.drawerRoot = this.mountPoint.querySelector(".mdc-drawer--persistent");
    this.menu = this.mountPoint.querySelector(".toolbar__menu");
    this.accountsMountPoint = this.mountPoint.querySelector(
      ".drawer__accounts-mountpoint"
    );
    this.tagsMountPoint = this.mountPoint.querySelector(
      ".drawer__tags-mountpoint"
    );
  }

  updateAccountDataAdd(transaction) {
    this.accountsComponent.updateAccountDataAdd(transaction);
  }

  updateAccountDataDelete(transaction) {
    this.accountsComponent.updateAccountDataDelete(transaction);
  }

  updateAccountDataEdit(oldTrans, newTrans) {
    this.accountsComponent.updateAccountDataEdit(oldTrans, newTrans);
  }

  mountChildren() {
    this.tagsComponent = new TagsComponent(this.tagsMountPoint, {
      onTagDelete: this.handleTagDelete.bind(this),
      onTagChange: this.props.onTagChange
    });
    this.tagsComponent.mount();
    this.accountsComponent = new AccountsComponent(this.accountsMountPoint, {
      onAccountDelete: this.props.onAccountDelete,
      onAccountUpdate: this.props.onAccountUpdate
    });
    this.accountsComponent.mount();
  }

  handleTagDelete() {
    this.props.onTagDelete();
    this.accountsComponent.initData();
  }

  initMDC() {
    this.drawer = new MDCPersistentDrawer(this.drawerRoot);
  }

  toggleDrawer() {
    this.drawer.open = !this.drawer.open;
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.initMDC();
    this.mountChildren();
  }
}
