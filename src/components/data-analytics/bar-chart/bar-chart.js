import template from "./bar-chart.html";
import Chart from "chart.js";

import { CurrencyConverterUAHService } from "../../../services/currency-converter-uah";

export class BarChartComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.dataset = { income: 0, expence: 0 };
  }

  querySelectors() {
    this.chartCtx = this.mountPoint.querySelector(".chart__visual");
  }

  updateAdd(data) {
    this.dataset = this.addCurrData(this.dataset, data);
    this.drawChanged();
  }

  updateDel(data) {
    this.dataset = this.delCurrData(this.dataset, data);
    this.drawChanged();
  }

  updateEdit(oldData, newData) {
    if (
      newData.type === oldData.type &&
      newData.amount === oldData.amount &&
      newData.account.currency === oldData.account.currency
    ) {
      return;
    }
    this.dataset = this.delCurrData(this.dataset, oldData);
    this.dataset = this.addCurrData(this.dataset, newData);
    this.drawChanged();
  }

  createFromList(list) {
    this.dataset.income = 0;
    this.dataset.expence = 0;
    this.dataset = list.reduce(this.addCurrData, this.dataset);
    this.drawChanged();
  }

  addCurrData(data, item) {
    let amount = item.amount;
    if (item.account.currency !== "UAH") {
      amount = CurrencyConverterUAHService.convert(
        item.account.currency,
        amount
      );
    }
    item.type === "-" ? (data.expence += amount) : (data.income += amount);
    return data;
  }

  delCurrData(data, item) {
    let amount = item.amount;
    if (item.account.currency !== "UAH") {
      amount = CurrencyConverterUAHService.convert(
        item.account.currency,
        amount
      );
    }
    item.type === "-" ? (data.expence -= amount) : (data.income -= amount);
    return data;
  }

  drawChanged() {
    this.chart.data.datasets[0].data = [
      this.dataset.income,
      this.dataset.expence
    ];
    this.chart.update();
  }

  draw() {
    this.chart = new Chart(this.chartCtx, {
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

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.draw();
  }
}
