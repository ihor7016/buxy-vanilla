import template from "./custom-select.html";

import { MDCSelect } from "@material/select";

export class CustomSelectComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  clean() {
    this.select.selectedIndex = -1;
  }

  querySelectors() {
    this.selectPoint = this.mountPoint.querySelector(".custom-select");
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
    }
  }

  mount() {
    this.mountPoint.innerHTML = template({
      list: this.props.items,
      type: this.props.type[0].toUpperCase() + this.props.type.slice(1)
    });
    this.querySelectors();
    this.initMDC();
    this.checkList();
  }
}
