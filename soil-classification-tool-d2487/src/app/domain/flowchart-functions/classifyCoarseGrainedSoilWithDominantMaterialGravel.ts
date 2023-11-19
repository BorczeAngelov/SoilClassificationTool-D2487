import { SoilData } from "../SoilData";
import { FINES_THRESHOLD, LOWER_PLASTICITY_INDEX_THRESHOLD, UPPER_PLASTICITY_INDEX_THRESHOLD, COEFFICIENT_OF_UNIFORMITY_THRESHOLD, LOWER_COEFFICIENT_OF_CURVATURE_THRESHOLD, UPPER_COEFFICIENT_OF_CURVATURE_THRESHOLD } from "../soil-classification.service";
import { extendNameIfNeeded_Sand } from "./extendNameIfNeededFunctions";

export function classifyCoarseGrainedSoilWithDominantMaterialGravel(
    data: SoilData
): string {
    let groupName = "";

    if (data.percentagePassingSieveNo200 > FINES_THRESHOLD) {
        if (data.plasticityIndex < LOWER_PLASTICITY_INDEX_THRESHOLD) {
            groupName = "GM-Silty gravel";
        } else if (data.plasticityIndex >= UPPER_PLASTICITY_INDEX_THRESHOLD) {
            groupName = "GC-Clayey gravel";
        } else {
            groupName = "GM-GC-Silty-clayey gravel";
        }
    } else {
        if (
            data.coefficientOfUniformity >= COEFFICIENT_OF_UNIFORMITY_THRESHOLD &&
            data.coefficientOfCurvature >= LOWER_COEFFICIENT_OF_CURVATURE_THRESHOLD &&
            data.coefficientOfCurvature <= UPPER_COEFFICIENT_OF_CURVATURE_THRESHOLD
        ) {
            groupName = "GW-Well-graded gravel";
        } else {
            groupName = "GP-Poorly-graded gravel";
        }
    }


    groupName = extendNameIfNeeded_Sand(data, groupName);

    return groupName;
}