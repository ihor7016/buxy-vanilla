import template from "./table-transactions.html";
import { ButtonmoreComponent } from "../buttonMore/button-more";

export class TableTransactionsComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.moreButtons = this.mountPoint.querySelectorAll(
      ".button-more__mount-point"
    );
    this.moreBtnMountPoints = this.mountPoint.querySelectorAll(
      ".button-more__mount-point"
    );
  }

  mount() {
    this.mountPoint.innerHTML = template();
  }
}
