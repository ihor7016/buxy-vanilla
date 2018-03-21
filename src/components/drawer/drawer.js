import template from "./drawer.html";
import { MDCPersistentDrawer } from "@material/drawer";
import { ButtonMoreComponent } from "../button-more/button-more";
import { TagsComponent } from "../tags/tags";

export class DrawerComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.drawerRoot = this.mountPoint.querySelector(".mdc-drawer--persistent");
    this.menu = this.mountPoint.querySelector(".toolbar__menu");

    this.addAccountButton = this.mountPoint.querySelector(
      ".drawer__add-account-dialog-activation"
    );
    this.tagsMountPoint = this.mountPoint.querySelector(
      ".drawer__tags-mountpoint"
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

  addEventListeners() {
    this.addAccountButton.addEventListener(
      "click",
      this.handleAddAccountClick.bind(this)
    );
  }

  handleAddAccountClick() {
    this.props.onAddAccountClick();
  }

  toggleDrawer() {
    this.drawer.open = !this.drawer.open;
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.initMDC();
    this.addEventListeners();
    this.initTagComponent();
  }
}
