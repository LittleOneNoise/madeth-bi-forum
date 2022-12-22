import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { EngineService } from '../services/engine.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contributionChart!: any;
  contributionAccurateChart!: any;
  readonly MAIN_RED_COLOR = '#db4c3b';
  readonly WHITE_TEXT_COLOR = '#f3f3f3';

  constructor(public engineService: EngineService) { }

  ngOnInit(): void {
    this.generateContributionChart();
    this.generateContributionAccurateChart();
  }

  public generateContributionChart(): void {

    const contributionChartData = this.engineService.getContributionChartCleanData();

    this.contributionChart = new Chart("contributionChart", {
      type: 'bar',
      data: contributionChartData,
      plugins: [ChartDataLabels],
      options: {
        plugins: {
          datalabels: {
            color: this.WHITE_TEXT_COLOR,
            formatter: function (value, context) {
              return Math.round(value);
            }
          }
        }
      }
    });
  }

  public generateContributionAccurateChart(): void {

    const contributionAccurateChartData = this.engineService.getContributionAccurateChartCleanData();

    this.contributionAccurateChart = new Chart("contributionAccurateChart", {
      type: 'bar',
      data: contributionAccurateChartData,
      plugins: [ChartDataLabels],
      options: {
        plugins: {
          datalabels: {
            color: this.WHITE_TEXT_COLOR,
            formatter: function (value, context) {
              return Math.round(value);
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

}
