import { SoilData } from "../SoilData";
import { COARSE_FRACTION_THRESHOLD_15, UPPER_PLASTICITY_INDEX_THRESHOLD_7 } from "../soil-classification.service";

export function classifyFineGrainedSoilWithLiquidLimitBelowHalf(data: SoilData): string {
    let groupName = "";
  
    if (data.percentagePassingSieveNo200 < COARSE_FRACTION_THRESHOLD_15) {
      if (data.plasticityIndex < UPPER_PLASTICITY_INDEX_THRESHOLD_7) {
        groupName = "CL-Lean clay";
      } else {
        groupName = "CL-ML-Lean clay-silt mixture";
      }
    } else {
      groupName = "ML-Silt";
    }
  
    // TODO: check the dominant values
    // groupName = extendNameIfNeeded_Sand(data, groupName);
    // groupName = extendNameIfNeeded_Gravel(data, groupName);
  
    return groupName;
  }