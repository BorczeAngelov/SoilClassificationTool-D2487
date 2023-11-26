import { Injectable } from '@angular/core';
import { VerificationByGeotechnicalEngineerData } from '../verification-by-engineer-form/VerificationByGeotechnicalEngineerData';

@Injectable({
  providedIn: 'root'
})
export class CsvUtilService {

  constructor() { }
  
  convertToCSV(verificationData: VerificationByGeotechnicalEngineerData): string {
    let csvRows = [];
  
    // Define the order of properties
    let propertiesOrder = [
      'dateOfTesting',    
      'geotechnicalEngineer',
      'classificationBySoftware',
      'classificationByEngineer',
      'doesClassificationMatch',
      'commentByEngineer',

      'geotechnicalEngineerCompany',
      'geotechnicalEngineerContact',
      
      'percentageOfGravel',
      'percentageOfSand',
      'percentageOfSilt',
      'percentageOfClay',
      'coefficientOfCurvature',
      'coefficientOfUniformity',
      'd10',
      'd30',
      'd60',
      'percentagePassingSieveNo200',
      'liquidLimit',
      'plasticityIndex',
      'atterbergLimitsSymbol',
      'percentageOfOrganicContent'
    ];
  
    // Get the values in the defined order
    let verificationValues = propertiesOrder.map(property => verificationData[property]).join(',');
    
    csvRows.push(verificationValues);
    return csvRows.join('\n');
  }
}
