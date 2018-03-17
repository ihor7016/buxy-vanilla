import template from "./drawer.html";
import { MDCPersistentDrawer } from "@material/drawer";
import { ButtonMoreComponent } from "../button-more/button-more";
import { TagsComponent } from "../tags/tags-component/tags-component";
import { Tag } from "../../model/tag";

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

  initMDC() {
    this.drawer = new MDCPersistentDrawer(this.drawerRoot);
  }

  initTags(tags) {
    tags.forEach(item => {
      this.addTag(item);
    });
  }

  mountChildren() {
    this.tagsComponent = new TagsComponent(this.tagsMountPoint, {
      addTagMountPoint: this.props.addTagMountPoint,
      onAddTagConfirmed: this.onAddTagConfirmed.bind(this)
    });
    this.tagsComponent.mount();
  }

  onAddTagConfirmed(tag) {
    this.addTag(tag);
  }

  addTag(tag) {
    this.tagsComponent.addTag(tag);
  }

  addEventListeners() {
    this.addAccountButton.addEventListener(
      "click",
      this.handleAddAccountClick.bind(this)
    );
  }

  handleEditClick() {
    console.log("handleEditClick");
  }
  handleDeleteClick() {
    console.log("handleDeleteClick");
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
    this.mountChildren();
  }
}
