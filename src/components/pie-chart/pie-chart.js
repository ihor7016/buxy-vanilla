import template from "./pie-chart.html";
import Chart from "chart.js";

export class PieChartComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.pieChartCtx = this.mountPoint.querySelector(".pie-chart");
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.createPieChart();
  }

  createPieChart() {
    let pieChart = new Chart(this.pieChartCtx, {
      type: "pie",
      data: {
        datasets: [
          {
            data: [10, 20, 30],
            backgroundColor: ["#673AB7", "#F44336", "#FFC107"]
          }
        ],
        labels: ["Transport", "Groceries", "Entertainment"]
      },
      options: {
        legend: {
          position: "right",
          labels: {
            fontFamily: "Roboto, sans-serif",
            fontSize: 14
          }
        }
      }
    });
  }
}
