import template from "./pie-chart.html";
import Chart from "chart.js";

import { CurrencyConverterUAH } from "../../services/currency-converter-uah";

export class PieChartComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.colors = [];
  }

  querySelectors() {
    this.pieChartCtx = this.mountPoint.querySelector(".chart__visual");
  }

  drawFromList(list) {
    let dataset = {};
    let tags = [];
    let amounts = [];
    list.forEach(row => {
      if (row.type == "+") return;
      if (row.account.currency != "UAH") {
        row.amount = CurrencyConverterUAH.convert(
          row.account.currency,
          row.amount
        );
      }
      if (row.tag in dataset) {
        dataset[row.tag] += row.amount;
      } else {
        dataset[row.tag] = row.amount;
      }
    });
    for (let tag in dataset) {
      tags.push(tag);
      amounts.push(dataset[tag]);
    }
    this.drawPieChart(tags, amounts);
  }

  randomColorGenerator() {
    return "#" + (Math.random().toString(16) + "0000000").slice(2, 8);
  }

  drawPieChart(tags, amounts) {
    while (this.colors.length < tags.length) {
      this.colors.push(this.randomColorGenerator());
    }
    if (this.pieChart) {
      this.pieChart.data.datasets[0].data = amounts;
      this.pieChart.data.datasets[0].backgroundColor = this.colors;
      this.pieChart.data.labels = tags;
      this.pieChart.update();
    } else {
      this.pieChart = new Chart(this.pieChartCtx, {
        type: "pie",
        data: {
          datasets: [
            {
              data: amounts,
              backgroundColor: this.colors
            }
          ],
          labels: tags
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

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
  }
}
