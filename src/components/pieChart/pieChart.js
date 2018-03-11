import template from "./pieChart.html";
import Chart from "chart.js";

export class PieChartComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.pieChart = this.mountPoint.querySelector(".pie-chart__visual");
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.createPieChart();
  }

  createPieChart() {
    let myPieChart = new Chart(this.pieChart, {
      type: "pie",
      data: {
        datasets: [
          {
            data: [10, 20, 30],
            backgroundColor: ["#ff0000", "#fff000", "#000fff"]
          }
        ],
        labels: ["Transport", "Groceries", "Entertainment"]
      }
    });
  }
}
