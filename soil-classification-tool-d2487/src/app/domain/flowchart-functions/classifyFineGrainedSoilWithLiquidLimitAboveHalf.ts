import { SoilData } from "../SoilData";

export function classifyFineGrainedSoilWithLiquidLimitAboveHalf(data: SoilData): string {
    // Declare constants locally
    const ORGANIC_CONTENT_30 = 30;

    const PERCENTAGE_PASSING_SIEVE_NO200_LOWER_15 = 15;
    const PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30 = 30;

    const SECONDARY_MATERIAL_THRESHOLD_15 = 15;

    let groupName = "";
    if (data.percentageOfOrganicContent < ORGANIC_CONTENT_30) {

        if (data.atterbergLimitsSymbol == "CH") {

            if (data.percentagePassingSieveNo200 < PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30) {
                if (data.percentagePassingSieveNo200 < PERCENTAGE_PASSING_SIEVE_NO200_LOWER_15) {
                    groupName = "CH-Fat clay" // ID=59
                }
                else {
                    if (data.percentageOfSand >= data.percentageOfGravel) {
                        groupName = "CH-Fat clay with sand" // ID=60
                    }
                    else {
                        groupName = "CH-Fat clay with gravel" // ID=61
                    }
                }
            } else {
                if (data.percentageOfSand >= data.percentageOfGravel) {
                    if (data.percentageOfGravel < SECONDARY_MATERIAL_THRESHOLD_15) {
                        groupName = "CH-Sandy fat clay" // ID=62
                    }
                    else {
                        groupName = "CH-Sandy fat clay with gravel" // ID=63
                    }
                }
                else {
                    if (data.percentageOfSand < SECONDARY_MATERIAL_THRESHOLD_15) {
                        groupName = "CH-Gravelly fat clay" // ID=64
                    }
                    else {
                        groupName = "CH-Gravelly fat clay with sand" // ID=65
                    }
                }
            }

        }
        else if (data.atterbergLimitsSymbol == "MH") {

            if (data.percentagePassingSieveNo200 < PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30) {
                if (data.percentagePassingSieveNo200 < PERCENTAGE_PASSING_SIEVE_NO200_LOWER_15) {
                    groupName = "MH-Elastic silt" // ID=66
                }
                else {
                    if (data.percentageOfSand >= data.percentageOfGravel) {
                        groupName = "MH-Elastic silt with sand" // ID=67
                    }
                    else {
                        groupName = "MH-Elastic silt with gravel" // ID=68
                    }
                }
            }
            else {
                if (data.percentageOfSand >= data.percentageOfGravel) {
                    if (data.percentageOfGravel < SECONDARY_MATERIAL_THRESHOLD_15) {
                        groupName = "MH-Sandy elastic silt" // ID=69
                    }
                    else {
                        groupName = "MH-Sandy elastic silt with gravel" // ID=70
                    }
                }
                else {
                    if (data.percentageOfSand < SECONDARY_MATERIAL_THRESHOLD_15) {
                        groupName = "MH-Gravelly elastic silt" // ID=71
                    }
                    else {
                        groupName = "MH-Gravelly elastic silt with sand" // ID=72
                    }
                }
            }
        }

    }
    else {
        groupName = "OH-Highly Organic Soil (Peat)" // ID=73
    }

    return groupName;
}