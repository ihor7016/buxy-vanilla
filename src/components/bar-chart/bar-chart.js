import template from "./bar-chart.html";
import Chart from "chart.js";

export class BarChartComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.barChartCtx = this.mountPoint.querySelector(".bar-chart__visual");
  }

  createBarChart() {
    Chart.defaults.global.defaultFontFamily = "'Roboto', sans-serif";
    Chart.defaults.global.defaultFontColor = "rgba(0, 0, 0, 0.87)";
    Chart.defaults.global.defaultFontStyle = "500";
    this.barChart = new Chart(this.barChartCtx, {
      type: "bar",
      data: {
        labels: ["Income", "Expense"],
        datasets: [
          {
            label: "Value",
            data: [5000, 3000],
            backgroundColor: ["#2e7d32", "#c62828"]
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false,
                color: "rgba(0, 0, 0, 0.12)"
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
                color: "rgba(0, 0, 0, 0.12)"
              }
            }
          ]
        }
      }
    });
  }

  mount() {
    this.mountPoint.innerHTML = template({ title: "Trend" });
    this.querySelectors();
    this.createBarChart();
  }
}
