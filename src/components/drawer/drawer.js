import template from "./drawer.html";
import { MDCPersistentDrawer } from "@material/drawer";
import { ButtonMoreComponent } from "../button-more/button-more";

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
    this.addTagButton = this.mountPoint.querySelector(
      ".drawer__add-tag-dialog-activation"
    );

    this.moreBtnMountPoints = this.mountPoint.querySelectorAll(
      ".drawer__mount-point"
    );
  }

  initMDC() {
    this.drawer = new MDCPersistentDrawer(this.drawerRoot);
  }

  initMoreBtns() {
    Array.from(this.moreBtnMountPoints).forEach(point => {
      new ButtonMoreComponent(point, {
        position: "right",
        onDeleteClicked: this.handleOnDeleteClick.bind(this),
        onEditClicked: this.handleOnEditClick.bind(this)
      }).mount();
    });
  }

  addEventListeners() {
    this.addAccountButton.addEventListener(
      "click",
      this.handleAddAccountClick.bind(this)
    );
    this.addTagButton.addEventListener(
      "click",
      this.handleAddTagOnclick.bind(this)
    );
  }

  handleOnEditClick() {}
  handleOnDeleteClick() {}

  handleAddAccountClick() {
    this.props.onAddAccountClick();
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
    this.initMoreBtns();
    this.addEventListeners();
  }
}
