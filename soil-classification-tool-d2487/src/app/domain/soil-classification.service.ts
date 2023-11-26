import { Injectable } from '@angular/core';
import { SoilData } from './SoilData';
import { classifyCoarseGrainedSoilWithDominantMaterialGravel } from './flowchart-functions/classifyCoarseGrainedSoilWithDominantMaterialGravel';
import { classifyCoarseGrainedSoilWithDominantMaterialSand } from './flowchart-functions/classifyCoarseGrainedSoilWithDominantMaterialSand';
import { classifyFineGrainedSoilWithLiquidLimitBelowHalf } from './flowchart-functions/classifyFineGrainedSoilWithLiquidLimitBelowHalf';
import { classifyFineGrainedSoilWithLiquidLimitAboveHalf } from './flowchart-functions/classifyFineGrainedSoilWithLiquidLimitAboveHalf';
import { VerificationByGeotechnicalEngineerData } from '../verification-by-engineer-form/VerificationByGeotechnicalEngineerData';
import { CsvUtilService } from '../verification-by-engineer-form/csv-util.service';

export const GRAIN_SIZE_THRESHOLD_50 = 50; // Percentage of soil passing 0.075 mm sieve
export const LIQUID_LIMIT_THRESHOLD_50 = 50; // Liquid limit for high plasticity soil

@Injectable({
  providedIn: 'root'
})
export class SoilClassificationService {
  public rawInputData!: SoilData;
  public rawOutputData!: string;
  public rawCsvData!: string;  
  public rawVerificationByGeotechnicalEngineerData!: VerificationByGeotechnicalEngineerData;

  constructor(private csvUtilService: CsvUtilService) { }

  classifySoilWithD2487Standard(data: SoilData): string {
    this.rawInputData = data;

    var result;
    if (data.percentagePassingSieveNo200 < GRAIN_SIZE_THRESHOLD_50) {
      result = this.classifyCoarseGrainedSoil(data);
    } else {
      result = this.classifyFineGrainedSoil(data);
    }

    this.rawOutputData = result;

    this.rawVerificationByGeotechnicalEngineerData = this.csvUtilService.convertToVerificationData(this.rawInputData, this.rawOutputData);
    this.rawCsvData = this.csvUtilService.convertToCSV(this.rawVerificationByGeotechnicalEngineerData);
    return result;
  }

  calculateCoefficientOfCurvature(d10: number, d30: number, d60: number): number {
    return (d30 * d30) / (d10 * d60);
  }

  calculateCoefficientOfUniformity(d10: number, d60: number): number {
    return d60 / d10;
  }

  private classifyCoarseGrainedSoil(data: SoilData): string {
    if (data.percentageOfGravel > data.percentageOfSand) {
      return classifyCoarseGrainedSoilWithDominantMaterialGravel(data);
    } else {
      return classifyCoarseGrainedSoilWithDominantMaterialSand(data);
    }
  }

  private classifyFineGrainedSoil(data: SoilData): string {
    if (data.liquidLimit < LIQUID_LIMIT_THRESHOLD_50) {
      return classifyFineGrainedSoilWithLiquidLimitBelowHalf(data);
    } else {
      return classifyFineGrainedSoilWithLiquidLimitAboveHalf(data);
    }
  }
}
