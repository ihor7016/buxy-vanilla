import template from "./buttonmore.html";
import { MDCMenu } from "@material/menu";

export class ButtonmoreComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.menuRoot = this.mountPoint.querySelector(".menu");
    this.buttonMore = this.mountPoint.querySelector(".button-more__more");
  }

  init() {
    this.menu = new MDCMenu(this.menuRoot);
  }

  addListeners() {
    this.buttonMore.addEventListener("click", this.handleBtnClick.bind(this));
  }

  handleBtnClick(event) {
    this.toggle();
    this.props.onMoreBtnClicked(event);
  }

  toggle() {
    this.menu.open = !this.menu.open;
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.init();
    this.addListeners();
  }
}
