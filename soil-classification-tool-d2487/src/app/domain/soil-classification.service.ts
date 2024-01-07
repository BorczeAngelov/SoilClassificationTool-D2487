import { Injectable } from '@angular/core';
import { SoilData } from './SoilData';
import { classifyCoarseGrainedSoilWithDominantMaterialGravel } from './flowchart-functions/classifyCoarseGrainedSoilWithDominantMaterialGravel';
import { classifyCoarseGrainedSoilWithDominantMaterialSand } from './flowchart-functions/classifyCoarseGrainedSoilWithDominantMaterialSand';
import { classifyFineGrainedSoilWithLiquidLimitBelowHalf } from './flowchart-functions/classifyFineGrainedSoilWithLiquidLimitBelowHalf';
import { classifyFineGrainedSoilWithLiquidLimitAboveHalf } from './flowchart-functions/classifyFineGrainedSoilWithLiquidLimitAboveHalf';

export const GRAIN_SIZE_THRESHOLD_50 = 50; // Way to determine flowchart function according to D2487-98 standard
export const LIQUID_LIMIT_THRESHOLD_50 = 50; // Liquid limit for high plasticity soil
const PERCENTAGE_OF_SAND_AND_GRAVEL_THRESHOLD_50 = 50; // Alternative way to determine flowchart function - recommended by engineer

@Injectable({
  providedIn: 'root'
})
export class SoilClassificationService {
  public rawInputData!: SoilData;
  public rawOutputData!: string;

  constructor() { }

  classifySoilWithD2487Standard(data: SoilData): string {
    this.rawInputData = data;

    var result;
    // const isCoarseGrainedSoil = data.percentagePassingSieveNo200 < GRAIN_SIZE_THRESHOLD_50; // obsolete
    const isCoarseGrainedSoil = data.percentageOfSand + data.percentageOfGravel > PERCENTAGE_OF_SAND_AND_GRAVEL_THRESHOLD_50;

    if (isCoarseGrainedSoil) {
      result = this.classifyCoarseGrainedSoil(data);
    } else {
      result = this.classifyFineGrainedSoil(data);
    }

    this.rawOutputData = result;    
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
