import { AtterbergLimitsSymbol, SoilData } from "../SoilData";
import { PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30, PERCENTAGE_PASSING_SIEVE_NO200_LOWER_15, SECONDARY_MATERIAL_THRESHOLD_15, ORGANIC_CONTENT_HIGH_30 } from "../ThresholdValues";
import { getExtendedFineGrainedSoilGroupName_BasedOnOrganicContent } from "./OrganicContentMethods";

export function classifyFineGrainedSoilWithLiquidLimitAboveHalf(data: SoilData): string {
    // set error message by default. it should be overwritten if the input is valid
    let groupName = `Unclassified - invalid input`;

    if (data.percentageOfOrganicContent < ORGANIC_CONTENT_HIGH_30) {

        if (data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CH) {

            if ((100 - data.percentagePassingSieveNo200) < PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30) {
                if ((100 - data.percentagePassingSieveNo200) < PERCENTAGE_PASSING_SIEVE_NO200_LOWER_15) {
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
        else if (data.atterbergLimitsSymbol == AtterbergLimitsSymbol.MH) {

            if ((100 - data.percentagePassingSieveNo200) < PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30) {
                if ((100 - data.percentagePassingSieveNo200) < PERCENTAGE_PASSING_SIEVE_NO200_LOWER_15) {
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
        else {
            return `Invalid input: atterbergLimitsSymbol "${data.atterbergLimitsSymbol}". classifyFineGrainedSoilWithLiquidLimitAboveHalf supports only "CH" or "MH".`;
        }

        groupName = getExtendedFineGrainedSoilGroupName_BasedOnOrganicContent(data, groupName);
    }
    else {
        groupName = "OH-Highly Organic Soil (Peat)" // ID=73
    }

    return groupName;
}