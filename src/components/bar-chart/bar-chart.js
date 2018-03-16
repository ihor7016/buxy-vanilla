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

  drawFromList(list) {
    let income = 0,
      expence = 0;
    list.forEach(transaction => {
      let amount = transaction.amount;
      if (transaction.account.currency != "UAH") {
        amount = CurrencyConverterUAH.convert(
          transaction.account.currency,
          amount
        );
      }
      transaction.type == "-" ? (expence += amount) : (income += amount);
    });
    this.drawBarChart(income, expence);
  }

  drawBarChart(income, expence) {
    if (this.barChart) {
      this.barChart.data.datasets[0].data = [income, expence];
      this.barChart.update();
    } else {
      this.barChart = new Chart(this.barChartCtx, {
        type: "bar",
        data: {
          labels: ["Income", "Expense"],
          datasets: [
            {
              label: "Value",
              data: [income, expence],
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
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
  }
}
