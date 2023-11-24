import { SoilData } from "../SoilData";
import { COARSE_FRACTION_THRESHOLD_15, UPPER_PLASTICITY_INDEX_THRESHOLD_7 } from "../soil-classification.service";
import { extendNameIfNeeded_Sand, extendNameIfNeeded_Gravel } from "./extendNameIfNeededFunctions";

export function classifyFineGrainedSoilWithLiquidLimitAboveHalf(data: SoilData): string {
    let groupName = "";

    if (data.percentagePassingSieveNo200 < COARSE_FRACTION_THRESHOLD_15) {
        if (data.plasticityIndex < UPPER_PLASTICITY_INDEX_THRESHOLD_7) {
            groupName = "CH-Fat clay";
        } else {
            groupName = "CH-MH-Fat clay-elastic silt mixture";
        }
    } else {
        groupName = "MH-Elastic silt";
    }

    groupName = extendNameIfNeeded_Sand(data, groupName);
    groupName = extendNameIfNeeded_Gravel(data, groupName);

    return groupName;
}