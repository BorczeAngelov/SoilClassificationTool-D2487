import { Injectable } from '@angular/core';
import { SoilData } from './SoilData';
import { classifyCoarseGrainedSoilWithDominantMaterialGravel } from './flowchart-functions/classifyCoarseGrainedSoilWithDominantMaterialGravel';
import { classifyCoarseGrainedSoilWithDominantMaterialSand } from './flowchart-functions/classifyCoarseGrainedSoilWithDominantMaterialSand';
import { classifyFineGrainedSoilWithLiquidLimitBelowHalf } from './flowchart-functions/classifyFineGrainedSoilWithLiquidLimitBelowHalf';
import { classifyFineGrainedSoilWithLiquidLimitAboveHalf } from './flowchart-functions/classifyFineGrainedSoilWithLiquidLimitAboveHalf';

// Constants for the soil classification criteria
export const GRAIN_SIZE_THRESHOLD_50 = 50; // Percentage of soil passing 0.075 mm sieve

export const FINES_THRESHOLD_LOWER_5 = 5;
export const FINES_THRESHOLD_UPPER_12 = 12;

export const COEFFICIENT_OF_UNIFORMITY_THRESHOLD_4 = 4; // Coefficient of uniformity for well-graded soil
export const LOWER_COEFFICIENT_OF_CURVATURE_THRESHOLD_1 = 1; // Lower bound of coefficient of curvature for well-graded soil
export const UPPER_COEFFICIENT_OF_CURVATURE_THRESHOLD_3 = 3; // Upper bound of coefficient of curvature for well-graded soil


export const LIQUID_LIMIT_THRESHOLD_50 = 50; // Liquid limit for high plasticity soil

export const COARSE_FRACTION_THRESHOLD_15 = 15; // Percentage of coarse fraction in fine-grained soil
export const LOWER_PLASTICITY_INDEX_THRESHOLD_4 = 4; // Lower bound of plasticity index for silty soil
export const UPPER_PLASTICITY_INDEX_THRESHOLD_7 = 7; // Upper bound of plasticity index for clayey soil

export const FINES_THRESHOLD_obs = 5; // Percentage of fines in coarse-grained soil


@Injectable({
  providedIn: 'root'
})
export class SoilClassificationService {
  public rawInputData!: SoilData;
  public rawOutputData!: string;

  constructor() { }

  classifySoilWithD2487Standard(data: SoilData): string {    
    this.rawInputData = data;
    console.log(this.rawInputData);
    
    var result;
    if (data.percentagePassingSieveNo200 < GRAIN_SIZE_THRESHOLD_50) {
      result = this.classifyCoarseGrainedSoil(data);
    } else {
      result = this.classifyFineGrainedSoil(data);
    }
    
    this.rawOutputData = result;
    console.log(this.rawOutputData);
    return result;
  }

  classifyCoarseGrainedSoil(data: SoilData): string {
    if (data.percentageOfGravel > data.percentageOfSand) {
      return classifyCoarseGrainedSoilWithDominantMaterialGravel(data);
    } else {
      return classifyCoarseGrainedSoilWithDominantMaterialSand(data);
    }
  }


  classifyFineGrainedSoil(data: SoilData): string {
    if (data.liquidLimit > LIQUID_LIMIT_THRESHOLD_50) {
      return classifyFineGrainedSoilWithLiquidLimitAboveHalf(data);
    } else {
      return classifyFineGrainedSoilWithLiquidLimitBelowHalf(data);
    }
  }
}
