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
    this.barChart = new Chart(this.barChartCtx, {
      type: "bar",
      data: {
        labels: ["Income", "Expense"],
        datasets: [
          {
            label: "Value",
            data: [5000, 3000],
            backgroundColor: ["rgba(0, 255, 0, 0.2)", "rgba(255, 0, 0, 0.2)"],
            borderColor: ["rgba(0, 255, 0, 1)", "rgba(255, 0, 0, 1)"],
            borderWidth: 1
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
              },
              gridLines: {
                display: false
              }
            }
          ],
          xAxes: [
            {
              barPercentage: 0.5,
              ticks: {
                fontFamily: "'Roboto', sans-serif",
                fontStyle: "500"
              },
              gridLines: {
                display: false
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
