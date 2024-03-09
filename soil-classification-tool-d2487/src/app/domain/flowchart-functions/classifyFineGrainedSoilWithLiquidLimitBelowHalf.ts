import { SoilData } from "../SoilData";
import { PLASTICITY_INDEX_UPPER_7, PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30, PERCENTAGE_PASSING_SIEVE_NO200_LOWER_15, SECONDARY_MATERIAL_THRESHOLD_15, PLASTICITY_INDEX_LOWER_4, ORGANIC_CONTENT_HIGH_30 } from "../ThresholdValues";
import { getExtendedFineGrainedSoilGroupName_BasedOnOrganicContent } from "./OrganicContentMethods";

export function classifyFineGrainedSoilWithLiquidLimitBelowHalf(data: SoilData): string {

  let groupName = "";
  if (data.percentageOfOrganicContent < ORGANIC_CONTENT_HIGH_30) {

    if (data.atterbergLimitsSymbol == "CL" || data.atterbergLimitsSymbol == "CL-ML") {
      if (data.plasticityIndex > PLASTICITY_INDEX_UPPER_7) {

        if ((100 - data.percentagePassingSieveNo200) < PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30) {
          if ((100 - data.percentagePassingSieveNo200) < PERCENTAGE_PASSING_SIEVE_NO200_LOWER_15) {
            groupName = "CL-Lean clay" // ID=37
          }
          else {
            if (data.percentageOfSand >= data.percentageOfGravel) {
              groupName = "CL-Lean clay with sand" // ID=38
            }
            else {
              groupName = "CL-Lean clay with gravel" // ID=39
            }
          }
        } else {
          if (data.percentageOfSand >= data.percentageOfGravel) {
            if (data.percentageOfGravel < SECONDARY_MATERIAL_THRESHOLD_15) {
              groupName = "CL-Sandy lean clay" // ID=40
            }
            else {
              groupName = "CL-Sandy lean clay with gravel" // ID=41
            }
          }
          else {
            if (data.percentageOfSand < SECONDARY_MATERIAL_THRESHOLD_15) {
              groupName = "CL-Gravelly lean clay" // ID=42
            }
            else {
              groupName = "CL-Gravelly lean clay with sand" // ID=43
            }
          }
        }

      }
      else if (data.plasticityIndex >= PLASTICITY_INDEX_LOWER_4 && data.plasticityIndex <= PLASTICITY_INDEX_UPPER_7) {

        if ((100 - data.percentagePassingSieveNo200) < PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30) {
          if ((100 - data.percentagePassingSieveNo200) < PERCENTAGE_PASSING_SIEVE_NO200_LOWER_15) {
            groupName = "CL-ML-Silty clay" // ID=44
          }
          else {
            if (data.percentageOfSand >= data.percentageOfGravel) {
              groupName = "CL-ML-Silty clay with sand" // ID=45
            }
            else {
              groupName = "CL-ML-Silty clay with gravel" // ID=46
            }
          }
        }
        else {
          if (data.percentageOfSand >= data.percentageOfGravel) {
            if (data.percentageOfGravel < SECONDARY_MATERIAL_THRESHOLD_15) {
              groupName = "CL-ML-Sandy silty clay" // ID=47
            }
            else {
              groupName = "CL-ML-Sandy silty clay with gravel" // ID=48
            }
          }
          else {
            if (data.percentageOfSand < SECONDARY_MATERIAL_THRESHOLD_15) {
              groupName = "CL-ML-Gravelly silty clay" // ID=49
            }
            else {
              groupName = "CL-ML-Gravelly silty clay with sand" // ID=50
            }
          }
        }
      }
      else {
        classifyML();
      }
    }
    else if (data.atterbergLimitsSymbol == "ML" || data.plasticityIndex < PLASTICITY_INDEX_LOWER_4) {
      classifyML();
    }

    groupName = getExtendedFineGrainedSoilGroupName_BasedOnOrganicContent(data, groupName);
  }
  else {
    groupName = "OL-Highly Organic Soil (Peat)" // ID=58
  }

  return groupName;

  function classifyML() {
    if ((100 - data.percentagePassingSieveNo200) < PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30) {
      if ((100 - data.percentagePassingSieveNo200) < PERCENTAGE_PASSING_SIEVE_NO200_LOWER_15) {
        groupName = "ML-Silt"; // ID=51
      }
      else {
        if (data.percentageOfSand >= data.percentageOfGravel) {
          groupName = "ML-Silt with sand"; // ID=52
        }
        else {
          groupName = "ML-Silt with gravel"; // ID=53
        }
      }
    }
    else {
      if (data.percentageOfSand >= data.percentageOfGravel) {
        if (data.percentageOfGravel < SECONDARY_MATERIAL_THRESHOLD_15) {
          groupName = "ML-Sandy silt"; // ID=54
        }
        else {
          groupName = "ML-Sandy silt with gravel"; // ID=55
        }
      }
      else {
        if (data.percentageOfSand < SECONDARY_MATERIAL_THRESHOLD_15) {
          groupName = "ML-Gravelly silt"; // ID=56
        }
        else {
          groupName = "ML-Gravelly silt with sand";
        }
      }
    }
  }
}