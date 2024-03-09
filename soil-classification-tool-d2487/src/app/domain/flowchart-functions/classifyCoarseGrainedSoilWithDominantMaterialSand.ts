import { AtterbergLimitsSymbol, SoilData } from "../SoilData";
import { GRAVEL_THRESHOLD_15, FINES_LOWER_5, COEFFICIENT_OF_UNIFORMITY_6, COEFFICIENT_OF_CURVATURE_LOWER_1, COEFFICIENT_OF_CURVATURE_UPPER_3, FINES_UPPER_12 } from "../ThresholdValues";

export function classifyCoarseGrainedSoilWithDominantMaterialSand(data: SoilData): string {
    let isGravelBelowThreshold = data.percentageOfGravel < GRAVEL_THRESHOLD_15;
    let dataFinesPercentage = data.percentageOfSilt + data.percentageOfClay;

    // set error message by default. it should be overwritten if the input is valid
    let groupName = `Unclassified - invalid input`;
    if (dataFinesPercentage < FINES_LOWER_5) {

        if (data.coefficientOfUniformity >= COEFFICIENT_OF_UNIFORMITY_6 &&
            data.coefficientOfCurvature >= COEFFICIENT_OF_CURVATURE_LOWER_1 &&
            data.coefficientOfCurvature <= COEFFICIENT_OF_CURVATURE_UPPER_3
        ) {
            if (isGravelBelowThreshold) {
                groupName = "SW-Well-graded sand"; // ID=19
            } else {
                groupName = "SW-Well-graded sand with gravel"; // ID=20
            }

        } else {
            if (isGravelBelowThreshold) {
                groupName = "SP-Poorly graded sand"; // ID=21
            } else {
                groupName = "SP-Poorly graded sand with gravel"; // ID=22
            }
        }

    } else if (dataFinesPercentage >= FINES_LOWER_5 && dataFinesPercentage <= FINES_UPPER_12) {

        if (data.coefficientOfUniformity >= COEFFICIENT_OF_UNIFORMITY_6 &&
            data.coefficientOfCurvature >= COEFFICIENT_OF_CURVATURE_LOWER_1 &&
            data.coefficientOfCurvature <= COEFFICIENT_OF_CURVATURE_UPPER_3
        ) {

            if (data.atterbergLimitsSymbol == AtterbergLimitsSymbol.ML || data.atterbergLimitsSymbol == AtterbergLimitsSymbol.MH) {
                if (isGravelBelowThreshold) {
                    groupName = "SW-SM-Well-graded sand with silt"; // ID=23
                } else {
                    groupName = "SW-SM-Well-graded sand with silt and gravel"; // ID=24
                }
            }
            else if (data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CL || data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CH || data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CLML) {
                if (isGravelBelowThreshold) {
                    groupName = "SW-SC-Well-graded sand with clay (or silty clay)"; // ID=25
                } else {
                    groupName = "SW-SC-Well-graded sand with clay and gravel (or silty clay and gravel)"; // ID=26
                }
            }

        } else {

            if (data.atterbergLimitsSymbol == AtterbergLimitsSymbol.ML || data.atterbergLimitsSymbol == AtterbergLimitsSymbol.MH) {
                if (isGravelBelowThreshold) {
                    groupName = "SP-SM-Poorly graded sand with silt"; // ID=27
                } else {
                    groupName = "SP-SM-Poorly graded sand with silt and gravel"; // ID=28
                }
            }
            else if (data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CL || data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CH || data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CLML) {
                if (isGravelBelowThreshold) {
                    groupName = "SP-SC-Poorly graded sand with clay (or silty clay)"; // ID=29
                } else {
                    groupName = "SP-SC-Poorly graded sand with clay and gravel (or silty clay and gravel)"; // ID=30
                }
            }

        }

    } else {

        if (data.atterbergLimitsSymbol == AtterbergLimitsSymbol.ML || data.atterbergLimitsSymbol == AtterbergLimitsSymbol.MH) {
            if (isGravelBelowThreshold) {
                groupName = "SM-Silty sand"; // ID=31
            } else {
                groupName = "SM-Silty sand with gravel"; // ID=32
            }
        }
        else if (data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CL || data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CH) {
            if (isGravelBelowThreshold) {
                groupName = "SC-Clayey sand"; // ID=33
            } else {
                groupName = "SC-Clayey sand with gravel"; // ID=34
            }
        }
        else if (data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CLML) {
            if (isGravelBelowThreshold) {
                groupName = "SC-SM-Silty, clayey sand"; // ID=35
            } else {
                groupName = "SC-SM-Silty, clayey sand with gravel"; // ID=36
            }
        }
    }

    return groupName;
}