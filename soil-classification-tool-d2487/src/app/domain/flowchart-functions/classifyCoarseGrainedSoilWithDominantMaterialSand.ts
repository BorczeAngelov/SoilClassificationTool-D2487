import { SoilData } from "../SoilData";

export function classifyCoarseGrainedSoilWithDominantMaterialSand(data: SoilData): string {
    // Declare constants locally
    const FINES_LOWER_5 = 5;
    const FINES_UPPER_12 = 12;

    const COEFFICIENT_OF_UNIFORMITY_6 = 6;
    const COEFFICIENT_OF_CURVATURE_LOWER_1 = 1;
    const COEFFICIENT_OF_CURVATURE_UPPER_3 = 3;

    
    const GRAVEL_THRESHOLD_15 = 15;
    let isGravelBelowThreshold = data.percentageOfSand < GRAVEL_THRESHOLD_15;
    
    let groupName = "";
    if (data.percentagePassingSieveNo200 < FINES_LOWER_5) {

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

    } else if (data.percentagePassingSieveNo200 >= FINES_LOWER_5 && data.percentagePassingSieveNo200 <= FINES_UPPER_12) {

        if (data.coefficientOfUniformity >= COEFFICIENT_OF_UNIFORMITY_6 &&
            data.coefficientOfCurvature >= COEFFICIENT_OF_CURVATURE_LOWER_1 &&
            data.coefficientOfCurvature <= COEFFICIENT_OF_CURVATURE_UPPER_3
        ) {

            // TODO 1
            // if (fines = ML or MH)
            {
                if (isGravelBelowThreshold) {
                    groupName = "SW-SM-Well-graded sand with silt"; // ID=23
                } else {
                    groupName = "SW-SM-Well-graded sand with silt and gravel"; // ID=24
                }
            }
            // TODO 2
            // else if (fines = CL,CH or CL-ML)
            {
                if (isGravelBelowThreshold) {
                    groupName = "SW-SC-Well-graded sand with clay (or silty clay)"; // ID=25
                } else {
                    groupName = "SW-SC-Well-graded sand with clay and gravel (or silty clay and gravel)"; // ID=26
                }
            }

        } else {

            // TODO 1
            // if (fines = ML or MH)
            {
                if (isGravelBelowThreshold) {
                    groupName = "SP-SM-Poorly graded sand with silt"; // ID=27
                } else {
                    groupName = "SP-SM-Poorly graded sand with silt and gravel"; // ID=28
                }
            }
            // TODO 2
            // else if (fines = CL,CH or CL-ML)
            {
                if (isGravelBelowThreshold) {
                    groupName = "SP-SC-Poorly graded sand with clay (or silty clay)"; // ID=29
                } else {
                    groupName = "SP-SC-Poorly graded sand with clay and gravel (or silty clay and gravel)"; // ID=30
                }
            }

        }

    } else {

        // TODO 1
        // if (fines = ML or MH)
        {
            if (isGravelBelowThreshold) {
                groupName = "SM-Silty sand"; // ID=31
            } else {
                groupName = "SM-Silty sand with gravel"; // ID=32
            }
        }
        // TODO 2
        // else if (fines = CL or CH)
        {
            if (isGravelBelowThreshold) {
                groupName = "SC-Clayey sand"; // ID=33
            } else {
                groupName = "SC-Clayey sand with gravel"; // ID=34
            }
        }
        // TODO 3
        // else if (fines = CL-ML)
        {
            if (isGravelBelowThreshold) {
                groupName = "SC-SM-Silty, clayey sand"; // ID=35
            } else {
                groupName = "SC-SM-Silty, clayey sand with gravel"; // ID=36
            }
        }
    }

    return groupName;
}