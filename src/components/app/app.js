import template from "./app.html";
import { BarChart } from "../barChart/barChart.js";

export class AppComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  mount() {
    this.mountPoint.innerHTML = new BarChart([10, 34], ["Spent", "Income"], "myChart");
  }
}
