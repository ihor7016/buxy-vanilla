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
  }

  initMDC() {
    this.menu = new MDCMenu(this.menuRoot);
  }

  addEventListener() {
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
    this.initMDC();
    this.addEventListener();
  }
}
