import template from "./button-more.html";
import { MDCMenu } from "@material/menu";

export class ButtonMoreComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.menuRoot = this.mountPoint.querySelector(".menu");
    this.buttonMore = this.mountPoint.querySelector(".button-more__more");
    this.buttonDelete = this.mountPoint.querySelector(
      ".button-more__popup-item-delete"
    );
    this.buttonEdit = this.mountPoint.querySelector(
      ".button-more__popup-item-edit"
    );
  }

  initPosition() {
    switch (this.props.position) {
      case "left":
        this.menuRoot.classList.add("button-more__popup-left");
        break;
      case "right":
        this.menuRoot.classList.add("button-more__popup-right");
        break;
    }
  }

  initMDC() {
    this.menu = new MDCMenu(this.menuRoot);
  }

  addEventListeners() {
    this.buttonMore.addEventListener("click", this.handleBtnClick.bind(this));
    this.buttonDelete.addEventListener(
      "click",
      this.handleItemClickDelete.bind(this)
    );
    this.buttonEdit.addEventListener(
      "click",
      this.handleItemClickEdit.bind(this)
    );
  }

  handleItemClickDelete(e) {
    this.props.onDeleteClick(e);
  }

  handleItemClickEdit() {
    this.props.onEditClick();
  }

  handleBtnClick(event) {
    this.toggle();
  }

  toggle() {
    this.menu.open = !this.menu.open;
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.initMDC();
    this.addEventListeners();
    this.initPosition();
  }
}
