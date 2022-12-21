import { Injectable } from '@angular/core';
import contributionRawData from '../../../../../generated_data/data_for_contribution_kpi.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  readonly MONTHS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"];
  readonly QUESTION_LABEL = 'Poster un nouveau message';
  readonly REPONSE_LABEL = 'Répondre à un message';
  readonly MAIN_RED_COLOR = '#db4c3b';
  readonly WHITE_TEXT_COLOR = '#f3f3f3';

  constructor() { }

  public getContributionChartCleanData(): any {

    let dataFirstStep: any = {};
    let dataSecondStep: any = {};

    for (const contributionLine of Object.values(contributionRawData)) {

      const month = this.MONTHS[new Date(contributionLine.Date).getMonth()];

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

    for (const k of Object.keys(dataFirstStep)) {
      if (Object.keys(dataFirstStep[k]).length == 2) {
        dataSecondStep[k] = dataFirstStep[k][this.REPONSE_LABEL] / dataFirstStep[k][this.QUESTION_LABEL];
      }
    };

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
          backgroundColor: this.MAIN_RED_COLOR,
          borderWidth: 1,
          barPercentage: 0.4
        }
      ]
    }

    return result;
  }

  public getContributionAccurateChartCleanData(): any {

    let dataFirstStep: any[] = [];
    let dataSecondStep: any = {};

    for (const contributionLine of Object.values(contributionRawData)) {

      const month = this.MONTHS[new Date(contributionLine.Date).getMonth()];

      // Only getting march month data
      if (month == this.MONTHS[2]) {
        // Splitting string on comma
        let firstSplit = contributionLine.Attribut?.split(',');
        // Splitting every sub string on equal sign and adding first part as key and 2nd part value
        let temp: any = {};
        firstSplit.forEach(e => {
          let temp2: any = e.split('=');
          temp[temp2[0]] = Number(temp2[1]);
        });

        dataFirstStep.push({ Titre: contributionLine.Titre, ...temp });
      }

    }

    console.log(dataFirstStep);

    for (let index = 0; index < dataFirstStep.length; index++) {
      // If we are dealing a response message
      if (dataFirstStep[index].Titre === this.REPONSE_LABEL) {
        let rootParentId = this.lookingForOriginalParentMessage(dataFirstStep, dataFirstStep[index].IDParent);
        if (rootParentId != -1) {
          dataSecondStep[rootParentId] = (dataSecondStep[rootParentId] || 0) + 1;
        }
      }
    }

    console.log(dataSecondStep);

    console.log(Object.keys(dataSecondStep).length)

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
          label: "Nombre de réponses par question",
          data: tempDatasetArray,
          backgroundColor: this.MAIN_RED_COLOR,
          borderWidth: 1,
          barPercentage: 0.4,
        }
      ]
    }

    return result;


  }

  public lookingForOriginalParentMessage(array: any[], id: number): number {

    let originalMessageId = -1;

    for (let index = 0; index < array.length; index++) {
      if (array[index].IDMsg == id) {
        // If an IDParent is found
        originalMessageId = id;
        // If the parent is found but is itself also a response to another message
        if ("IDParent" in array[index]) {
          originalMessageId = this.lookingForOriginalParentMessage(array, array[index].IDParent);
        } else {
          // No parent found in the array
          break;
        }
      }

    }

    return originalMessageId;
  }


}
