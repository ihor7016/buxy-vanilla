import template from "./custom-select.html";

import { MDCSelect } from "@material/select";

export class CustomSelectComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  addItems(list) {
    this.menu.innerHTML = list
      .map(elem => {
        return `
        <li class="mdc-list-item" role="option" tabindex="0">
          ${elem}
        </li>
        `;
      })
      .join("");
    this.checkList();
  }

  clean() {
    this.select.selectedIndex = -1;
  }

  querySelectors() {
    this.selectPoint = this.mountPoint.querySelector(".custom-select");
    this.menu = this.mountPoint.querySelector(".custom-select__menu-items");
  }

  initMDC() {
    this.select = new MDCSelect(this.selectPoint);
  }

  getValue() {
    return this.select.value.replace(/\r|\n|\s/g, "");
  }

  checkList() {
    if (!this.select.options.length) {
      this.select.disabled = true;
    } else {
      this.select.disabled = false;
    }
  }

  mount() {
    this.mountPoint.innerHTML = template({
      type: this.props.type[0].toUpperCase() + this.props.type.slice(1)
    });
    this.querySelectors();
    this.initMDC();
    this.checkList();
  }
}
