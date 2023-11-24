import { SoilData } from "../SoilData";
import { COARSE_FRACTION_THRESHOLD_15 } from "../soil-classification.service";

export function extendNameIfNeeded_Sand(data: SoilData, groupName: string): string {
    if (data.percentageOfSand >= COARSE_FRACTION_THRESHOLD_15) {
        groupName += " with sand";
    }
    return groupName;
}

export function extendNameIfNeeded_Gravel(data: SoilData, groupName: string): string {
    if (data.percentageOfGravel >= COARSE_FRACTION_THRESHOLD_15) {
        groupName += " with gravel";
    }
    return groupName;
}