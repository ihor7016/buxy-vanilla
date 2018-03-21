import template from "./drawer.html";
import { MDCPersistentDrawer } from "@material/drawer";
import { ButtonMoreComponent } from "../button-more/button-more";
import { AccountsComponent } from "../accounts/accounts";
import { TagsComponent } from "../tags/tags";

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
    this.moreBtnMountPoints = this.mountPoint.querySelectorAll(
      ".drawer__more-button"
    );
  }

  updateAccountData(transaction) {
    this.accountsComponent.updateAccountData(transaction);
  }

  updateTagData(transaction) {
    this.tagsComponent.updateTagData(transaction);
  }

  initAccountComponent() {
    this.accountsComponent = new AccountsComponent(this.accountsMountPoint);
    this.accountsComponent.mount();
  }

  initTagComponent() {
    this.tagsComponent = new TagsComponent(this.tagsMountPoint);
    this.tagsComponent.mount();
  }

  initMDC() {
    this.drawer = new MDCPersistentDrawer(this.drawerRoot);
  }

  initMoreBtns() {
    this.moreBtnMountPoints = this.mountPoint.querySelectorAll(
      ".drawer__more-button"
    );
    Array.from(this.moreBtnMountPoints).forEach(point => {
      new ButtonMoreComponent(point, {
        position: "right",
        onDeleteClicked: this.handleDeleteClick.bind(this),
        onEditClicked: this.handleEditClick.bind(this)
      }).mount();
    });
  }

  handleEditClick() {}

  handleDeleteClick() {}

  toggleDrawer() {
    this.drawer.open = !this.drawer.open;
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.initMoreBtns();
    this.initMDC();
    this.initAccountComponent();
    this.initTagComponent();
  }
}
