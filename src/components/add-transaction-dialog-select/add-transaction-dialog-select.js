import template from "./add-transaction-dialog-select.html";

import { MDCSelect } from "@material/select";

export class AddTransactionSelectComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  clean() {
    this.select.selectedIndex = -1;
  }

  getTag() {
    return this.getValue();
  }

  getAccount() {
    return this.props.items.find(item => {
      return item.name == this.getValue();
    });
  }

  makeList() {
    return this.props.items.map(item => (item.name ? item.name : item));
  }

  querySelectors() {
    this.selectPoint = this.mountPoint.firstChild;
  }

  addClass() {
    this.selectPoint.classList.add(
      `add-transaction-dialog__${this.props.type}`
    );
  }

  initMDC() {
    this.select = new MDCSelect(this.selectPoint);
  }

  getValue() {
    return this.select.value.replace(/\r|\n|\s/g, "");
  }

  mount() {
    this.makeList();
    this.mountPoint.innerHTML = template({
      list: this.makeList(),
      type: this.props.type[0].toUpperCase() + this.props.type.slice(1)
    });
    this.querySelectors();
    this.addClass();
    this.initMDC();
  }
}
