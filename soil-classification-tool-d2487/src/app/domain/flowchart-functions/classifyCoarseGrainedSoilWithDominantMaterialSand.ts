import { SoilData } from "../SoilData";
import { FINES_THRESHOLD, LOWER_PLASTICITY_INDEX_THRESHOLD, UPPER_PLASTICITY_INDEX_THRESHOLD, COEFFICIENT_OF_UNIFORMITY_THRESHOLD, LOWER_COEFFICIENT_OF_CURVATURE_THRESHOLD, UPPER_COEFFICIENT_OF_CURVATURE_THRESHOLD } from "../soil-classification.service";
import { extendNameIfNeeded_Gravel } from "./extendNameIfNeededFunctions";

export function classifyCoarseGrainedSoilWithDominantMaterialSand(
    data: SoilData
): string {
    let groupName = "";

    if (data.percentagePassingSieveNo200 > FINES_THRESHOLD) {
        if (data.plasticityIndex < LOWER_PLASTICITY_INDEX_THRESHOLD) {
            groupName = "SM-Silty sand";
        } else if (data.plasticityIndex >= UPPER_PLASTICITY_INDEX_THRESHOLD) {
            groupName = "SC-Clayey sand";
        } else {
            groupName = "SM-SC-Silty-clayey sand";
        }
    } else {
        if (
            data.coefficientOfUniformity >= COEFFICIENT_OF_UNIFORMITY_THRESHOLD &&
            data.coefficientOfCurvature >= LOWER_COEFFICIENT_OF_CURVATURE_THRESHOLD &&
            data.coefficientOfCurvature <= UPPER_COEFFICIENT_OF_CURVATURE_THRESHOLD
        ) {
            groupName = "SW-Well-graded sand";
        } else {
            groupName = "SP-Poorly-graded sand";
        }
    }

    groupName = extendNameIfNeeded_Gravel(data, groupName);

    return groupName;
}