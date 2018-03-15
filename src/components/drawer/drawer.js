import template from "./drawer.html";
import { MDCPersistentDrawer } from "@material/drawer";
import { ButtonMoreComponent } from "../button-more/button-more";
import { AccountsComponent } from "../accounts-component/accounts-component";

export class DrawerComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
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

  mountChildren() {
    new AccountsComponent(this.accountsMountPoint, {}).mount();
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
