"use strict";
import template from "./barChart.html";

	export class BarChart {
		constructor(data, labels, canvasID) {
			this._data = data;
			this._labels = labels;
			this._canvasID = canvasID;
		}
		
		getSetData(data) {
			if(arguments.length == 0) {
				return this._data;
			} else {
				this._data = data;
			}
			
		}
		
		getSetLabels(labels) {
			if(arguments.length == 0) {
				return this._labels;
			} else {
				this._labels = labels;
			}
			
		}			
		
		getSetCanvasID(ID) {
			if(arguments.length == 0) {
				return this._canvasID;
			} else {
				this._canvasID = ID;
			}				
		}
			
		createBarChart() {		
			let ctx = document.getElementById(this.getSetCanvasID());
			let myChart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: this.getSetLabels(),
					datasets: [{
						label: 'Data set',
						data: this.getSetData(),
						backgroundColor: [
							'rgba(200, 100, 50, 0.5)',
							'rgba(50, 100, 200, 0.5)'
						],
						borderColor: [
							'rgba(205,105,55,1)',
							'rgba(55, 105, 205, 1)'
						],
						borderWidth: 1
					}]
				},
				options: {
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			});
			return myChart;
		}
	}
	
	//let BCh = new BarChart([10, 34], ["Spent", "Income"], "myChart");
	
	//BCh.createBarChart();