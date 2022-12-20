import { Injectable } from '@angular/core';
import contributionRawData from '../../../../../generated_data/data_for_contribution_kpi.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  readonly months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"];
  readonly questionLabel = 'Poster un nouveau message';
  readonly reponseLabel = 'Répondre à un message';

  constructor() { }

  public getContributionChartCleanData(): any {

    let dataFirstStep: any = {};
    let dataSecondStep: any = {};

    for (const contributionLine of Object.values(contributionRawData)) {

      const month = this.months[new Date(contributionLine.Date).getMonth()];

      // Checks if the month doesn't exist as a key in the data object
      if (!(month in dataFirstStep)) {
        dataFirstStep[month] = { [contributionLine.Titre]: 1 };
      }

      // Checks if the event type (title) doesn't exist as a key in the data[month] object
      if (!(contributionLine.Titre in dataFirstStep[month])) {
        dataFirstStep[month][contributionLine.Titre] = 1;
      }

      dataFirstStep[month][contributionLine.Titre] += 1;

    };

    console.log(dataFirstStep);

    for (const k of Object.keys(dataFirstStep)) {
      if(Object.keys(dataFirstStep[k]).length == 2) {
        dataSecondStep[k] = dataFirstStep[k][this.reponseLabel]/dataFirstStep[k][this.questionLabel];
      }
    };

    console.log(dataSecondStep);

    let tempLabelArray: string[] = [];
    let tempDatasetArray: any[] = [];

    for (const [k, v] of Object.entries(dataSecondStep)) {
      tempLabelArray.push(k);
      tempDatasetArray.push(v);
    };

    const result = {
      labels: tempLabelArray,
      datasets: [
        {
          label: "Ratio réponses / questions",
          data: tempDatasetArray,
          backgroundColor: '#db4c3b'
        }
      ]
    }

    return result;
  }
}
