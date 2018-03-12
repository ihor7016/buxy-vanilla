import template from "./bar-chart.html";
import Chart from "chart.js";

export class BarChartComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.ctx = this.mountPoint.querySelector(".bar-chart");
  }

  initChart() {
    this.barChart = new Chart(this.ctx, {
      type: "bar",
      data: {
        labels: ["income", "expense"],
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
              stacked: true,
              ticks: {
                beginAtZero: true
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
    this.initChart();
  }
}
