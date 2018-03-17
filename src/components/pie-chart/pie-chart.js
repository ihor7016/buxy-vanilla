import template from "./pie-chart.html";
import Chart from "chart.js";

import { CurrencyConverterUAH } from "../../services/currency-converter-uah";

export class PieChartComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.pieChartCtx = this.mountPoint.querySelector(".chart__visual");
  }

  updateChart(data) {
    if (!this.pieChart) this.drawChart();
    let amount = data.amount;
    if (data.account.currency != "UAH") {
      amount = CurrencyConverterUAH.convert(data.account.currency, amount);
    }
    let i = this.dataset.tags.indexOf(data.tag);
    if (i < 0) {
      this.dataset.tags.push(data.tag);
      this.dataset.amounts.push(amount);
      this.dataset.colors.push(this.randomColorGenerator());
    } else {
      this.dataset.amounts[i] += amount;
    }
    this.drawChangedChart();
  }

  drawChangedChart() {
    this.pieChart.data.datasets[0].data = this.dataset.amounts;
    this.pieChart.data.datasets[0].backgroundColor = this.dataset.colors;
    this.pieChart.data.labels = this.dataset.tags;
    this.pieChart.update();
  }

  createFromList(list) {
    let expenceList = list.filter(item => {
      return item.type == "-";
    });
    this.dataset = expenceList.reduce(
      (data, item) => {
        let amount = item.amount;
        if (item.account.currency != "UAH") {
          amount = CurrencyConverterUAH.convert(item.account.currency, amount);
        }
        let i = data.tags.indexOf(item.tag);
        if (i < 0) {
          data.tags.push(item.tag);
          data.amounts.push(amount);
          data.colors.push(this.randomColorGenerator());
        } else {
          data.amounts[i] += amount;
        }
        return data;
      },
      {
        tags: [],
        amounts: [],
        colors: []
      }
    );
    this.drawChart();
  }

  drawChart() {
    this.pieChart = new Chart(this.pieChartCtx, {
      type: "pie",
      data: {
        datasets: [
          {
            data: this.dataset.amounts,
            backgroundColor: this.dataset.colors
          }
        ],
        labels: this.dataset.tags
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

  randomColorGenerator() {
    return "#" + (Math.random().toString(16) + "0000000").slice(2, 8);
  }

  makeZeroDataset() {
    this.dataset = {
      tags: [],
      amounts: [],
      colors: []
    };
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.makeZeroDataset();
  }
}
