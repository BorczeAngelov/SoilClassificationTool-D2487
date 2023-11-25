import { Injectable } from '@angular/core';
import { SoilData } from './SoilData';

@Injectable({
  providedIn: 'root'
})
export class CsvUtilService {

  constructor() { }

  convertToCSV(rawInputData: SoilData, rawOutputData: string): string {
    let csvRows = [];
    let inputKeys = Object.keys(rawInputData).join(',');
    let inputValues = Object.values(rawInputData).join(',');
    csvRows.push(inputKeys);
    csvRows.push(inputValues);
    let outputLines = rawOutputData.split('\n');
    for (let line of outputLines) {
      csvRows.push(line);
    }
    // Return the csvData as a string
    return csvRows.join('\n');
  }

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
