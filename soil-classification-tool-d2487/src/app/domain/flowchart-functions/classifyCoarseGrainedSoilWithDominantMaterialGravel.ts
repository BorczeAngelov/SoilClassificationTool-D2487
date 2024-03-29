import { AtterbergLimitsSymbol, SoilData } from "../SoilData";
import { SAND_THRESHOLD_15, FINES_LOWER_5, COEFFICIENT_OF_UNIFORMITY_4, COEFFICIENT_OF_CURVATURE_LOWER_1, COEFFICIENT_OF_CURVATURE_UPPER_3, FINES_UPPER_12 } from "../ThresholdValues";

export function classifyCoarseGrainedSoilWithDominantMaterialGravel(data: SoilData): string {
    let isSandBelowThreshold = data.percentageOfSand < SAND_THRESHOLD_15;
    let dataFinesPercentage = data.percentageOfSilt + data.percentageOfClay;

    // set error message by default. it should be overwritten if the input is valid
    let groupName = `Unclassified - invalid input`;
    if (dataFinesPercentage < FINES_LOWER_5) {

        if (data.coefficientOfUniformity >= COEFFICIENT_OF_UNIFORMITY_4 &&
            data.coefficientOfCurvature >= COEFFICIENT_OF_CURVATURE_LOWER_1 &&
            data.coefficientOfCurvature <= COEFFICIENT_OF_CURVATURE_UPPER_3
        ) {
            if (isSandBelowThreshold) {
                groupName = "GW-Well-graded gravel"; // ID=1
            } else {
                groupName = "GW-Well-graded gravel with sand"; // ID=2
            }

        } else {
            if (isSandBelowThreshold) {
                groupName = "GP-Poorly graded gravel"; // ID=3
            } else {
                groupName = "GP-Poorly graded gravel with sand"; // ID=4
            }
        }

    } else if (dataFinesPercentage >= FINES_LOWER_5 && dataFinesPercentage <= FINES_UPPER_12) {

        if (data.coefficientOfUniformity >= COEFFICIENT_OF_UNIFORMITY_4 &&
            data.coefficientOfCurvature >= COEFFICIENT_OF_CURVATURE_LOWER_1 &&
            data.coefficientOfCurvature <= COEFFICIENT_OF_CURVATURE_UPPER_3
        ) {

            if (data.atterbergLimitsSymbol == AtterbergLimitsSymbol.ML || data.atterbergLimitsSymbol == AtterbergLimitsSymbol.MH) {
                if (isSandBelowThreshold) {
                    groupName = "GW-GM-Well-graded gravel with silt"; // ID=5
                } else {
                    groupName = "GW-GM-Well-graded gravel with silt and sand"; // ID=6
                }
            }
            else if (data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CL || data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CH || data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CLML) {
                if (isSandBelowThreshold) {
                    groupName = "GW-GC-Well-graded gravel with clay (or silty clay)"; // ID=7
                } else {
                    groupName = "GW-GC-Well-graded gravel with clay and sand (or silty clay and sand)"; // ID=8
                }
            }

        } else {

            if (data.atterbergLimitsSymbol == AtterbergLimitsSymbol.ML || data.atterbergLimitsSymbol == AtterbergLimitsSymbol.MH) {
                if (isSandBelowThreshold) {
                    groupName = "GP-GM-Poorly graded gravel with silt"; // ID=9
                } else {
                    groupName = "GP-GM-Poorly graded gravel with silt and sand"; // ID=10
                }
            }
            else if (data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CL || data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CH || data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CLML) {
                if (isSandBelowThreshold) {
                    groupName = "GP-GC-Poorly graded gravel with clay (or silty clay)"; // ID=11
                } else {
                    groupName = "GP-GC-Poorly graded gravel with clay and sand (or silty clay and sand)"; // ID=12
                }
            }

        }

    } else {

        if (data.atterbergLimitsSymbol == AtterbergLimitsSymbol.ML || data.atterbergLimitsSymbol == AtterbergLimitsSymbol.MH) {
            if (isSandBelowThreshold) {
                groupName = "GM-Silty gravel"; // ID=13
            } else {
                groupName = "GM-Silty gravel with sand"; // ID=14
            }
        }
        else if (data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CL || data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CH) {
            if (isSandBelowThreshold) {
                groupName = "GC-Clayey gravel"; // ID=15
            } else {
                groupName = "GC-Clayey gravel with sand"; // ID=16
            }
        }
        else if (data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CLML) {
            if (isSandBelowThreshold) {
                groupName = "GC-GM-Silty, clayey gravel"; // ID=17
            } else {
                groupName = "GC-GM-Silty, clayey gravel with sand"; // ID=18
            }
        }
    }

    return groupName;
}