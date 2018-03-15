import template from "./table-transactions.html";
import { ButtonMoreComponent } from "../button-more/button-more";

export class TableTransactionsComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.moreBtnMountPoints = this.mountPoint.querySelectorAll(
      ".table-transactions__more-button"
    );
  }

  initMoreBtns() {
    Array.from(this.moreBtnMountPoints).forEach(point => {
      new ButtonMoreComponent(point, { position: "left" }).mount();
    });
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.initMoreBtns();
  }
}
