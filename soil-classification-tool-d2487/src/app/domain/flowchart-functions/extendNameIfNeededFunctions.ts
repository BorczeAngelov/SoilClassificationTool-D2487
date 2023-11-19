import { SoilData } from "../SoilData";
import { COARSE_FRACTION_THRESHOLD } from "../soil-classification.service";

export function extendNameIfNeeded_Sand(data: SoilData, groupName: string): string {
    if (data.percentageOfSand > COARSE_FRACTION_THRESHOLD) {
        groupName += " with sand";
    }
    return groupName;
}

// Function to extend the group name if the soil contains more than 15% gravel
export function extendNameIfNeeded_Gravel(data: SoilData, groupName: string): string {
    if (data.percentageOfGravel > COARSE_FRACTION_THRESHOLD) {
        groupName += " with gravel";
    }
    return groupName;
}