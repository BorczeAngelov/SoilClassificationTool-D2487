import { Injectable } from '@angular/core';
import { VerificationByGeotechnicalEngineerData } from '../verification-by-engineer-form/VerificationByGeotechnicalEngineerData';
import { SoilData } from '../domain/SoilData';

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
  
  convertToCSV(verificationData: VerificationByGeotechnicalEngineerData): string {
    let csvRows = [];
    let verificationValues = Object.values(verificationData).join(',');
    csvRows.push(verificationValues);
    return csvRows.join('\n');
  }
}
