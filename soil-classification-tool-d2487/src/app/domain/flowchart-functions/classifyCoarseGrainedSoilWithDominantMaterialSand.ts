import { SoilData } from "../SoilData";
import { FINES_THRESHOLD_obs, LOWER_PLASTICITY_INDEX_THRESHOLD_4, UPPER_PLASTICITY_INDEX_THRESHOLD_7, COEFFICIENT_OF_UNIFORMITY_THRESHOLD_4, LOWER_COEFFICIENT_OF_CURVATURE_THRESHOLD_1, UPPER_COEFFICIENT_OF_CURVATURE_THRESHOLD_3 } from "../soil-classification.service";
import { extendNameIfNeeded_Gravel } from "./extendNameIfNeededFunctions";

export function classifyCoarseGrainedSoilWithDominantMaterialSand(
    data: SoilData
): string {
    let groupName = "";

    if (data.percentagePassingSieveNo200 > FINES_THRESHOLD_obs) {
        if (data.plasticityIndex < LOWER_PLASTICITY_INDEX_THRESHOLD_4) {
            groupName = "SM-Silty sand";
        } else if (data.plasticityIndex >= UPPER_PLASTICITY_INDEX_THRESHOLD_7) {
            groupName = "SC-Clayey sand";
        } else {
            groupName = "SM-SC-Silty-clayey sand";
        }
    } else {
        if (
            data.coefficientOfUniformity >= COEFFICIENT_OF_UNIFORMITY_THRESHOLD_4 &&
            data.coefficientOfCurvature >= LOWER_COEFFICIENT_OF_CURVATURE_THRESHOLD_1 &&
            data.coefficientOfCurvature <= UPPER_COEFFICIENT_OF_CURVATURE_THRESHOLD_3
        ) {
            groupName = "SW-Well-graded sand";
        } else {
            groupName = "SP-Poorly-graded sand";
        }
    }

    groupName = extendNameIfNeeded_Gravel(data, groupName);

    return groupName;
}