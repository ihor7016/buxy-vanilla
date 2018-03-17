import template from "./bar-chart.html";
import Chart from "chart.js";

import { CurrencyConverterUAH } from "../../services/currency-converter-uah";

export class BarChartComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.barChartCtx = this.mountPoint.querySelector(".chart__visual");
  }

  updateChart(data) {
    let amount = data.amount;
    if (data.account.currency !== "UAH") {
      amount = CurrencyConverterUAH.convert(data.account.currency, amount);
    }
    data.type === "-"
      ? (this.dataset.expence += amount)
      : (this.dataset.income += amount);
    this.drawChangedChart();
  }

  drawChangedChart() {
    if (!this.barChart) this.drawChart();
    this.barChart.data.datasets[0].data = [
      this.dataset.income,
      this.dataset.expence
    ];
    this.barChart.update();
  }

  createFromList(list) {
    this.dataset = list.reduce(
      (data, item) => {
        let amount = item.amount;
        if (item.account.currency !== "UAH") {
          amount = CurrencyConverterUAH.convert(item.account.currency, amount);
        }
        item.type === "-" ? (data.expence += amount) : (data.income += amount);
        return data;
      },
      {
        income: 0,
        expence: 0
      }
    );
    this.drawChart();
  }

  drawChart() {
    this.barChart = new Chart(this.barChartCtx, {
      type: "bar",
      data: {
        labels: ["Income", "Expense"],
        datasets: [
          {
            label: "Value",
            data: [this.dataset.income, this.dataset.expence],
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

  makeZeroDataset() {
    this.dataset = {
      income: 0,
      expence: 0
    };
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.makeZeroDataset();
  }
}
