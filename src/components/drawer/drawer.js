import template from "./drawer.html";
import { MDCPersistentDrawer } from "@material/drawer";
import { ButtonMoreComponent } from "../button-more/button-more";
import { TagsComponent } from "../tags/tags";
import { AccountsComponent } from "../accounts/accounts";

export class DrawerComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.drawerRoot = this.mountPoint.querySelector(".mdc-drawer--persistent");
    this.menu = this.mountPoint.querySelector(".toolbar__menu");
    this.tagsMountPoint = this.mountPoint.querySelector(
      ".drawer__tags-mountpoint"
    );
    this.addTagButton = this.mountPoint.querySelector(
      ".drawer__add-tag-dialog-activation"
    );
    this.accountsMountPoint = this.mountPoint.querySelector(
      ".drawer__accounts-mountpoint"
    );
    this.moreBtnMountPoints = this.mountPoint.querySelectorAll(
      ".drawer__more-button"
    );
  }

  initTagComponent() {
    this.tagsComponent = new TagsComponent(this.tagsMountPoint);
    this.tagsComponent.mount();
  }
  updateAccountData(transaction) {
    this.accountsComponent.updateAccountData(transaction);
  }

  initAccountComponent() {
    this.accountsComponent = new AccountsComponent(this.accountsMountPoint);
    this.accountsComponent.mount();
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
