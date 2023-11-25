import { Injectable } from '@angular/core';
import { SoilData } from './SoilData';
import { VerificationByGeotechnicalEngineerData } from './VerificationByGeotechnicalEngineerData';

@Injectable({
  providedIn: 'root'
})
export class CsvUtilService {

  constructor() { }

  // Define a function that converts the SoilData to a VerificationByGeotechnicalEngineerData object
  convertToVerificationData(rawInputData: SoilData, rawOutputData: string): VerificationByGeotechnicalEngineerData {
    // Use a hard-coded value "Work-in-Progress" for the properties that are not part of SoilData
    let verificationData: VerificationByGeotechnicalEngineerData = {
      dateOfTesting: new Date("Work-in-Progress"),
      geotechnicalEngineer: "Work-in-Progress",
      geotechnicalEngineerCompany: "Work-in-Progress",
      geotechnicalEngineerContact: "Work-in-Progress",
      classificationByEngineer: "Work-in-Progress",
      classificationBySoftware: rawOutputData,
      doesClassificationMatch: false,      
      commentByEngineer: "Work-in-Progress",
      percentageOfGravel: rawInputData.percentageOfGravel,
      percentageOfSand: rawInputData.percentageOfSand,
      percentageOfSilt: rawInputData.percentageOfSilt,
      percentageOfClay: rawInputData.percentageOfClay,
      coefficientOfCurvature: rawInputData.coefficientOfCurvature,
      coefficientOfUniformity: rawInputData.coefficientOfUniformity,
      d10: rawInputData.d10,
      d30: rawInputData.d30,
      d60: rawInputData.d60,
      percentagePassingSieveNo200: rawInputData.percentagePassingSieveNo200,
      liquidLimit: rawInputData.liquidLimit,
      plasticityIndex: rawInputData.plasticityIndex,
      atterbergLimitsSymbol: rawInputData.atterbergLimitsSymbol,
      percentageOfOrganicContent: rawInputData.percentageOfOrganicContent
    };
    // Return the verification data object
    return verificationData;
  }

  // Modify the convertToCSV function to use the verification data object instead of the raw input and output data
  convertToCSV(verificationData: VerificationByGeotechnicalEngineerData): string {
    let csvRows = [];
    // Get the keys and values of the verification data object and join them with commas
    let verificationKeys = Object.keys(verificationData).join(',');
    let verificationValues = Object.values(verificationData).join(',');
    // Push the keys and values to the csv rows array
    csvRows.push(verificationKeys);
    csvRows.push(verificationValues);
    // Return the csvData as a string
    return csvRows.join('\n');
  }

  // The downloadCSVFile function remains the same as before
  downloadCSVFile(csvData: string) {
    // Check if the csvData is not empty
    if (csvData) {
      let blob = new Blob([csvData], { type: 'text/csv' });
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.href = url;
      a.download = 'data.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } else {
      console.error('No CSV data to download');
    }
  }

}
