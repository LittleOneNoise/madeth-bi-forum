import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contributionChart!: any;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.generateContributionChart();
  }

  public generateContributionChart(): void {

    const contributionChartData = this.dataService.getContributionChartCleanData();

    this.contributionChart = new Chart("contributionChart", {
      type: 'bar',
      data: contributionChartData,
      options: {
        aspectRatio: 2.5
      }

    });
  }

}
