import template from "./transaction-dialog-select.html";

import { MDCSelect } from "@material/select";

export class TransactionSelectComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  clean() {
    this.select.selectedIndex = -1;
  }

  getAccount() {
    return this.props.items.find(item => {
      return item.name == this.getValue();
    });
  }

  getList() {
    let list;
    if (this.props.items[0] && this.props.items[0].name) {
      list = this.props.items.map(item => item.name);
    } else list = this.props.items;
    return list;
  }

  querySelectors() {
    this.selectPoint = this.mountPoint.querySelector(
      ".transaction-dialog-select"
    );
  }

  addClass() {
    this.selectPoint.classList.add(
      `transaction-dialog-select__${this.props.type}`
    );
  }

  initMDC() {
    this.select = new MDCSelect(this.selectPoint);
  }

  getValue() {
    return this.select.value.replace(/\r|\n|\s/g, "");
  }

  mount() {
    this.mountPoint.innerHTML = template({
      list: this.getList(),
      type: this.props.type[0].toUpperCase() + this.props.type.slice(1)
    });
    this.querySelectors();
    this.addClass();
    this.initMDC();
  }
}
