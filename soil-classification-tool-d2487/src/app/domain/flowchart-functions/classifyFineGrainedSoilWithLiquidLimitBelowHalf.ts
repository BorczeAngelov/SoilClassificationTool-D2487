import { SoilData } from "../SoilData";
import { COARSE_FRACTION_THRESHOLD, UPPER_PLASTICITY_INDEX_THRESHOLD } from "../soil-classification.service";
import { extendNameIfNeeded_Sand, extendNameIfNeeded_Gravel } from "./extendNameIfNeededFunctions";

export function classifyFineGrainedSoilWithLiquidLimitBelowHalf(data: SoilData): string {
    let groupName = "";
  
    if (data.percentagePassingSieveNo200 < COARSE_FRACTION_THRESHOLD) {
      if (data.plasticityIndex < UPPER_PLASTICITY_INDEX_THRESHOLD) {
        groupName = "CL-Lean clay";
      } else {
        groupName = "CL-ML-Lean clay-silt mixture";
      }
    } else {
      groupName = "ML-Silt";
    }
  
    // TODO: check the dominant values
    groupName = extendNameIfNeeded_Sand(data, groupName);
    groupName = extendNameIfNeeded_Gravel(data, groupName);
  
    return groupName;
  }