import template from "./bar-chart.html";
import Chart from "chart.js";

export class BarChartComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.barChartCtx = this.mountPoint.querySelector(".bar-chart");
  }

  createBarChart() {
    this.barChart = new Chart(this.barChartCtx, {
      type: "bar",
      data: {
        labels: ["Income", "Expense"],
        datasets: [
          {
            label: "Value",
            data: [5000, 3000],
            backgroundColor: ["#4caf50", "#f44336"]
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
                beginAtZero: true,
                fontFamily: "'Roboto', sans-serif",
                fontStyle: "500"
              }
            }
          ],
          xAxes: [
            {
              barPercentage: 0.5,
              ticks: {
                fontFamily: "'Roboto', sans-serif",
                fontStyle: "500"
              }
            }
          ]
        }
      }
    });
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.createBarChart();
  }
}
