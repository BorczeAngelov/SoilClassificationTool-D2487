import { SoilData, AtterbergLimitsSymbol } from '../domain/SoilData';
import { SAND_THRESHOLD_15, FINES_LOWER_5, COEFFICIENT_OF_CURVATURE_LOWER_1, COEFFICIENT_OF_UNIFORMITY_4, GRAIN_SIZE_THRESHOLD_50, FINES_UPPER_12, GRAVEL_THRESHOLD_15, COEFFICIENT_OF_UNIFORMITY_6, PLASTICITY_INDEX_UPPER_7, PERCENTAGE_PASSING_SIEVE_NO200_LOWER_15, LIQUID_LIMIT_THRESHOLD_50, PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30, SECONDARY_MATERIAL_THRESHOLD_15, PLASTICITY_INDEX_LOWER_4, ORGANIC_CONTENT_HIGH_30 } from '../domain/ThresholdValues';

const x = 0.1;

interface TestCase {
    id: number;
    expectedClassification: string;
    edgeCaseDeltaInfo: string;
    data: SoilData;
}

export type ClassifiedSoilData = {
    testCase: TestCase;
    classificationResults: string;
    isSuccess: boolean;
}

export const normalTestCases: TestCase[] = [
    //#region classifyCoarseGrainedSoilWithDominantMaterialGravel
    {
        id: 1,
        expectedClassification: "GW-Well-graded gravel",
        edgeCaseDeltaInfo: "isSandBelowThreshold == true",
        data: { percentageOfGravel: 51, percentageOfSand: SAND_THRESHOLD_15 - x, percentageOfSilt: FINES_LOWER_5 - x, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_4, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },
    {
        id: 2,
        expectedClassification: "GW-Well-graded gravel with sand",
        edgeCaseDeltaInfo: "isSandBelowThreshold == false",
        data: { percentageOfGravel: 51, percentageOfSand: SAND_THRESHOLD_15, percentageOfSilt: FINES_LOWER_5 - x, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_4, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },

    {
        id: 3,
        expectedClassification: "GP-Poorly graded gravel",
        edgeCaseDeltaInfo: "outside Cc and Cu range",
        data: { percentageOfGravel: 51, percentageOfSand: SAND_THRESHOLD_15 - x, percentageOfSilt: FINES_LOWER_5 - x, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1 - x, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_4 - x, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },
    {
        id: 4,
        expectedClassification: "GP-Poorly graded gravel with sand",
        edgeCaseDeltaInfo: "isSandBelowThreshold == false",
        data: { percentageOfGravel: 51, percentageOfSand: SAND_THRESHOLD_15, percentageOfSilt: FINES_LOWER_5 - x, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1 - x, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_4 - x, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },
    {
        id: 5,
        expectedClassification: "GW-GM-Well-graded gravel with silt",
        edgeCaseDeltaInfo: "dataFinesPercentage >= FINES_LOWER_5",
        data: { percentageOfGravel: 51, percentageOfSand: SAND_THRESHOLD_15 - x, percentageOfSilt: FINES_LOWER_5, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_4, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.ML },
    },
    {
        id: 6,
        expectedClassification: "GW-GM-Well-graded gravel with silt and sand",
        edgeCaseDeltaInfo: "isSandBelowThreshold == false",
        data: { percentageOfGravel: 51, percentageOfSand: SAND_THRESHOLD_15, percentageOfSilt: FINES_LOWER_5, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_4, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.ML },
    },
    {
        id: 7,
        expectedClassification: "GW-GC-Well-graded gravel with clay (or silty clay)",
        edgeCaseDeltaInfo: "data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CL",
        data: { percentageOfGravel: 51, percentageOfSand: SAND_THRESHOLD_15 - x, percentageOfSilt: FINES_LOWER_5, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_4, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },
    {
        id: 8,
        expectedClassification: "GW-GC-Well-graded gravel with clay and sand (or silty clay and sand)",
        edgeCaseDeltaInfo: "isSandBelowThreshold == false",
        data: { percentageOfGravel: 51, percentageOfSand: SAND_THRESHOLD_15, percentageOfSilt: FINES_LOWER_5, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_4, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },

    {
        id: 9,
        expectedClassification: "GP-GM-Poorly graded gravel with silt",
        edgeCaseDeltaInfo: "COEFFICIENT_OF_CURVATURE_LOWER_1 - x",
        data: { percentageOfGravel: 51, percentageOfSand: SAND_THRESHOLD_15 - x, percentageOfSilt: FINES_LOWER_5, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1 - x, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_4, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.ML },
    },
    {
        id: 10,
        expectedClassification: "GP-GM-Poorly graded gravel with silt and sand",
        edgeCaseDeltaInfo: "isSandBelowThreshold == false",
        data: { percentageOfGravel: 51, percentageOfSand: SAND_THRESHOLD_15, percentageOfSilt: FINES_LOWER_5, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1 - x, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_4, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.ML },
    },
    {
        id: 11,
        expectedClassification: "GP-GC-Poorly graded gravel with clay (or silty clay)",
        edgeCaseDeltaInfo: "data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CL",
        data: { percentageOfGravel: 51, percentageOfSand: SAND_THRESHOLD_15 - x, percentageOfSilt: FINES_LOWER_5, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1 - x, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_4, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },
    {
        id: 12,
        expectedClassification: "GP-GC-Poorly graded gravel with clay and sand (or silty clay and sand)",
        edgeCaseDeltaInfo: "isSandBelowThreshold == false",
        data: { percentageOfGravel: 51, percentageOfSand: SAND_THRESHOLD_15, percentageOfSilt: FINES_LOWER_5, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1 - x, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_4, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },


    {
        id: 13,
        expectedClassification: "GM-Silty gravel",
        edgeCaseDeltaInfo: "FINES_UPPER_12 > ",
        data: { percentageOfGravel: 51, percentageOfSand: SAND_THRESHOLD_15 - x, percentageOfSilt: FINES_UPPER_12 + x, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1 - x, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_4, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.ML },
    },
    {
        id: 14,
        expectedClassification: "GM-Silty gravel with sand",
        edgeCaseDeltaInfo: "isSandBelowThreshold == false",
        data: { percentageOfGravel: 51, percentageOfSand: SAND_THRESHOLD_15, percentageOfSilt: FINES_UPPER_12 + x, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1 - x, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_4, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.ML },
    },
    {
        id: 15,
        expectedClassification: "GC-Clayey gravel",
        edgeCaseDeltaInfo: "data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CL",
        data: { percentageOfGravel: 51, percentageOfSand: SAND_THRESHOLD_15 - x, percentageOfSilt: FINES_UPPER_12 + x, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1 - x, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_4, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },
    {
        id: 16,
        expectedClassification: "GC-Clayey gravel with sand",
        edgeCaseDeltaInfo: "isSandBelowThreshold == false",
        data: { percentageOfGravel: 51, percentageOfSand: SAND_THRESHOLD_15, percentageOfSilt: FINES_UPPER_12 + x, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1 - x, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_4, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },
    {
        id: 17,
        expectedClassification: "GC-GM-Silty, clayey gravel",
        edgeCaseDeltaInfo: "data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CL",
        data: { percentageOfGravel: 51, percentageOfSand: SAND_THRESHOLD_15 - x, percentageOfSilt: FINES_UPPER_12 + x, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1 - x, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_4, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CLML },
    },
    {
        id: 18,
        expectedClassification: "GC-GM-Silty, clayey gravel with sand",
        edgeCaseDeltaInfo: "isSandBelowThreshold == false",
        data: { percentageOfGravel: 51, percentageOfSand: SAND_THRESHOLD_15, percentageOfSilt: FINES_UPPER_12 + x, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1 - x, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_4, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CLML },
    },
    //#endregion

    //#region classifyCoarseGrainedSoilWithDominantMaterialSand
    {
        id: 19,
        expectedClassification: "SW-Well-graded sand",
        edgeCaseDeltaInfo: "isSandBelowThreshold == true",
        data: { percentageOfGravel: GRAVEL_THRESHOLD_15 - x, percentageOfSand: 51, percentageOfSilt: FINES_LOWER_5 - x, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_6, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },
    {
        id: 20,
        expectedClassification: "SW-Well-graded sand with gravel",
        edgeCaseDeltaInfo: "isSandBelowThreshold == false",
        data: { percentageOfGravel: GRAVEL_THRESHOLD_15, percentageOfSand: 51, percentageOfSilt: FINES_LOWER_5 - x, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_6, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },

    {
        id: 21,
        expectedClassification: "SP-Poorly graded sand",
        edgeCaseDeltaInfo: "outside Cc and Cu range",
        data: { percentageOfGravel: GRAVEL_THRESHOLD_15 - x, percentageOfSand: 51, percentageOfSilt: FINES_LOWER_5 - x, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1 - x, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_6 - x, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },
    {
        id: 22,
        expectedClassification: "SP-Poorly graded sand with gravel",
        edgeCaseDeltaInfo: "isSandBelowThreshold == false",
        data: { percentageOfGravel: GRAVEL_THRESHOLD_15, percentageOfSand: 51, percentageOfSilt: FINES_LOWER_5 - x, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1 - x, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_6 - x, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },
    {
        id: 23,
        expectedClassification: "SW-SM-Well-graded sand with silt",
        edgeCaseDeltaInfo: "dataFinesPercentage >= FINES_LOWER_5",
        data: { percentageOfGravel: GRAVEL_THRESHOLD_15 - x, percentageOfSand: 51, percentageOfSilt: FINES_LOWER_5, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_6, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.ML },
    },
    {
        id: 24,
        expectedClassification: "SW-SM-Well-graded sand with silt and gravel",
        edgeCaseDeltaInfo: "isSandBelowThreshold == false",
        data: { percentageOfGravel: GRAVEL_THRESHOLD_15, percentageOfSand: 51, percentageOfSilt: FINES_LOWER_5, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_6, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.ML },
    },
    {
        id: 25,
        expectedClassification: "SW-SC-Well-graded sand with clay (or silty clay)",
        edgeCaseDeltaInfo: "data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CL",
        data: { percentageOfGravel: GRAVEL_THRESHOLD_15 - x, percentageOfSand: 51, percentageOfSilt: FINES_LOWER_5, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_6, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },
    {
        id: 26,
        expectedClassification: "SW-SC-Well-graded sand with clay and gravel (or silty clay and gravel)",
        edgeCaseDeltaInfo: "isSandBelowThreshold == false",
        data: { percentageOfGravel: GRAVEL_THRESHOLD_15, percentageOfSand: 51, percentageOfSilt: FINES_LOWER_5, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_6, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },

    {
        id: 27,
        expectedClassification: "SP-SM-Poorly graded sand with silt",
        edgeCaseDeltaInfo: "COEFFICIENT_OF_CURVATURE_LOWER_1 - x",
        data: { percentageOfGravel: GRAVEL_THRESHOLD_15 - x, percentageOfSand: 51, percentageOfSilt: FINES_LOWER_5, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1 - x, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_6, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.ML },
    },
    {
        id: 28,
        expectedClassification: "SP-SM-Poorly graded sand with silt and gravel",
        edgeCaseDeltaInfo: "isSandBelowThreshold == false",
        data: { percentageOfGravel: GRAVEL_THRESHOLD_15, percentageOfSand: 51, percentageOfSilt: FINES_LOWER_5, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1 - x, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_6, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.ML },
    },
    {
        id: 29,
        expectedClassification: "SP-SC-Poorly graded sand with clay (or silty clay)",
        edgeCaseDeltaInfo: "data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CL",
        data: { percentageOfGravel: GRAVEL_THRESHOLD_15 - x, percentageOfSand: 51, percentageOfSilt: FINES_LOWER_5, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1 - x, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_6, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },
    {
        id: 30,
        expectedClassification: "SP-SC-Poorly graded sand with clay and gravel (or silty clay and gravel)",
        edgeCaseDeltaInfo: "isSandBelowThreshold == false",
        data: { percentageOfGravel: GRAVEL_THRESHOLD_15, percentageOfSand: 51, percentageOfSilt: FINES_LOWER_5, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1 - x, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_6, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },


    {
        id: 31,
        expectedClassification: "SM-Silty sand",
        edgeCaseDeltaInfo: "FINES_UPPER_12 > ",
        data: { percentageOfGravel: GRAVEL_THRESHOLD_15 - x, percentageOfSand: 51, percentageOfSilt: FINES_UPPER_12 + x, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1 - x, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_6, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.ML },
    },
    {
        id: 32,
        expectedClassification: "SM-Silty sand with gravel",
        edgeCaseDeltaInfo: "isSandBelowThreshold == false",
        data: { percentageOfGravel: GRAVEL_THRESHOLD_15, percentageOfSand: 51, percentageOfSilt: FINES_UPPER_12 + x, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1 - x, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_6, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.ML },
    },
    {
        id: 33,
        expectedClassification: "SC-Clayey sand",
        edgeCaseDeltaInfo: "data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CL",
        data: { percentageOfGravel: GRAVEL_THRESHOLD_15 - x, percentageOfSand: 51, percentageOfSilt: FINES_UPPER_12 + x, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1 - x, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_6, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },
    {
        id: 34,
        expectedClassification: "SC-Clayey sand with gravel",
        edgeCaseDeltaInfo: "isSandBelowThreshold == false",
        data: { percentageOfGravel: GRAVEL_THRESHOLD_15, percentageOfSand: 51, percentageOfSilt: FINES_UPPER_12 + x, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1 - x, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_6, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },
    {
        id: 35,
        expectedClassification: "SC-SM-Silty, clayey sand",
        edgeCaseDeltaInfo: "data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CL",
        data: { percentageOfGravel: GRAVEL_THRESHOLD_15 - x, percentageOfSand: 51, percentageOfSilt: FINES_UPPER_12 + x, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1 - x, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_6, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CLML },
    },
    {
        id: 36,
        expectedClassification: "SC-SM-Silty, clayey sand with gravel",
        edgeCaseDeltaInfo: "isSandBelowThreshold == false",
        data: { percentageOfGravel: GRAVEL_THRESHOLD_15, percentageOfSand: 51, percentageOfSilt: FINES_UPPER_12 + x, percentageOfClay: 0, coefficientOfCurvature: COEFFICIENT_OF_CURVATURE_LOWER_1 - x, coefficientOfUniformity: COEFFICIENT_OF_UNIFORMITY_6, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: GRAIN_SIZE_THRESHOLD_50 - x, liquidLimit: 0, plasticityIndex: 0, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CLML },
    },

    //#endregion

    //#region classifyFineGrainedSoilWithLiquidLimitBelowHalf
    {
        id: 37,
        expectedClassification: "CL-Lean clay",
        edgeCaseDeltaInfo: "LL < 50",
        data: { percentageOfGravel: 5, percentageOfSand: 10, percentageOfSilt: 25, percentageOfClay: 60, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_LOWER_15 - x), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 - x, plasticityIndex: PLASTICITY_INDEX_UPPER_7 + x, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },
    {
        id: 38,
        expectedClassification: "CL-Lean clay with sand",
        edgeCaseDeltaInfo: "percentagePassingSieveNo200",
        data: { percentageOfGravel: 5, percentageOfSand: 10, percentageOfSilt: 25, percentageOfClay: 60, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30 - x), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 - x, plasticityIndex: PLASTICITY_INDEX_UPPER_7 + x, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },
    {
        id: 39,
        expectedClassification: "CL-Lean clay with gravel",
        edgeCaseDeltaInfo: "data.percentageOfSand >= data.percentageOfGravel",
        data: { percentageOfGravel: 10, percentageOfSand: 5, percentageOfSilt: 25, percentageOfClay: 60, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30 - x), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 - x, plasticityIndex: PLASTICITY_INDEX_UPPER_7 + x, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },
    {
        id: 40,
        expectedClassification: "CL-Sandy lean clay",
        edgeCaseDeltaInfo: "false data.percentageOfSand >= data.percentageOfGravel",
        data: { percentageOfGravel: 10, percentageOfSand: SECONDARY_MATERIAL_THRESHOLD_15, percentageOfSilt: 25, percentageOfClay: 50, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30, liquidLimit: LIQUID_LIMIT_THRESHOLD_50 - x, plasticityIndex: PLASTICITY_INDEX_UPPER_7 + x, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },
    {
        id: 41,
        expectedClassification: "CL-Sandy lean clay with gravel",
        edgeCaseDeltaInfo: "dataFinesPercentage >= FINES_LOWER_5",
        data: { percentageOfGravel: SECONDARY_MATERIAL_THRESHOLD_15, percentageOfSand: 25, percentageOfSilt: 10, percentageOfClay: 50, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30, liquidLimit: LIQUID_LIMIT_THRESHOLD_50 - x, plasticityIndex: PLASTICITY_INDEX_UPPER_7 + x, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },
    {
        id: 42,
        expectedClassification: "CL-Gravelly lean clay",
        edgeCaseDeltaInfo: "percentageOfSand is lower than percentageOfGravel",
        data: { percentageOfGravel: 25 + x, percentageOfSand: SECONDARY_MATERIAL_THRESHOLD_15 - x, percentageOfSilt: 10, percentageOfClay: 50, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 - x, plasticityIndex: PLASTICITY_INDEX_UPPER_7 + x, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },
    {
        id: 43,
        expectedClassification: "CL-Gravelly lean clay with sand",
        edgeCaseDeltaInfo: "percentageOfSand >= 15",
        data: { percentageOfGravel: 25, percentageOfSand: SECONDARY_MATERIAL_THRESHOLD_15, percentageOfSilt: 10, percentageOfClay: 50, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 - x, plasticityIndex: PLASTICITY_INDEX_UPPER_7 + x, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CL },
    },

    // PI is lower than 7
    {
        id: 44,
        expectedClassification: "CL-ML-Silty clay",
        edgeCaseDeltaInfo: "PI is lower than 7",
        data: { percentageOfGravel: 5, percentageOfSand: 10, percentageOfSilt: 25, percentageOfClay: 60, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_LOWER_15 - x), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 - x, plasticityIndex: PLASTICITY_INDEX_UPPER_7, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CLML },
    },
    {
        id: 45,
        expectedClassification: "CL-ML-Silty clay with sand",
        edgeCaseDeltaInfo: "percentagePassingSieveNo200",
        data: { percentageOfGravel: 5, percentageOfSand: 10, percentageOfSilt: 25, percentageOfClay: 60, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30 - x), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 - x, plasticityIndex: PLASTICITY_INDEX_UPPER_7, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CLML },
    },
    {
        id: 46,
        expectedClassification: "CL-ML-Silty clay with gravel",
        edgeCaseDeltaInfo: "data.percentageOfSand >= data.percentageOfGravel",
        data: { percentageOfGravel: 10, percentageOfSand: 5, percentageOfSilt: 25, percentageOfClay: 60, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30 - x), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 - x, plasticityIndex: PLASTICITY_INDEX_UPPER_7, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CLML },
    },
    {
        id: 47,
        expectedClassification: "CL-ML-Sandy silty clay",
        edgeCaseDeltaInfo: "false data.percentageOfSand >= data.percentageOfGravel",
        data: { percentageOfGravel: 10, percentageOfSand: SECONDARY_MATERIAL_THRESHOLD_15, percentageOfSilt: 25, percentageOfClay: 50, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30, liquidLimit: LIQUID_LIMIT_THRESHOLD_50 - x, plasticityIndex: PLASTICITY_INDEX_UPPER_7, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CLML },
    },
    {
        id: 48,
        expectedClassification: "CL-ML-Sandy silty clay with gravel",
        edgeCaseDeltaInfo: "dataFinesPercentage >= FINES_LOWER_5",
        data: { percentageOfGravel: SECONDARY_MATERIAL_THRESHOLD_15, percentageOfSand: 25, percentageOfSilt: 10, percentageOfClay: 50, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30, liquidLimit: LIQUID_LIMIT_THRESHOLD_50 - x, plasticityIndex: PLASTICITY_INDEX_UPPER_7, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CLML },
    },
    {
        id: 49,
        expectedClassification: "CL-ML-Gravelly silty clay",
        edgeCaseDeltaInfo: "percentageOfSand is lower than percentageOfGravel",
        data: { percentageOfGravel: 25 + x, percentageOfSand: SECONDARY_MATERIAL_THRESHOLD_15 - x, percentageOfSilt: 10, percentageOfClay: 50, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 - x, plasticityIndex: PLASTICITY_INDEX_UPPER_7, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CLML },
    },
    {
        id: 50,
        expectedClassification: "CL-ML-Gravelly silty clay with sand",
        edgeCaseDeltaInfo: "percentageOfSand >= 15",
        data: { percentageOfGravel: 25, percentageOfSand: SECONDARY_MATERIAL_THRESHOLD_15, percentageOfSilt: 10, percentageOfClay: 50, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 - x, plasticityIndex: PLASTICITY_INDEX_UPPER_7, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CLML },
    },

    // PI is lower than 4
    {
        id: 51,
        expectedClassification: "ML-Silt",
        edgeCaseDeltaInfo: "data.atterbergLimitsSymbol == AtterbergLimitsSymbol.CL",
        data: { percentageOfGravel: 5, percentageOfSand: 10, percentageOfSilt: 25, percentageOfClay: 60, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_LOWER_15 - x), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 - x, plasticityIndex: PLASTICITY_INDEX_LOWER_4 - x, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.ML },
    },
    {
        id: 52,
        expectedClassification: "ML-Silt with sand",
        edgeCaseDeltaInfo: "percentagePassingSieveNo200",
        data: { percentageOfGravel: 5, percentageOfSand: 10, percentageOfSilt: 25, percentageOfClay: 60, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30 - x), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 - x, plasticityIndex: PLASTICITY_INDEX_LOWER_4 - x, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.ML },
    },
    {
        id: 53,
        expectedClassification: "ML-Silt with gravel",
        edgeCaseDeltaInfo: "false data.percentageOfSand >= data.percentageOfGravel",
        data: { percentageOfGravel: 10, percentageOfSand: 5, percentageOfSilt: 25, percentageOfClay: 60, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30 - x), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 - x, plasticityIndex: PLASTICITY_INDEX_LOWER_4 - x, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.ML },
    },
    {
        id: 54,
        expectedClassification: "ML-Sandy silt",
        edgeCaseDeltaInfo: "dataFinesPercentage >= FINES_LOWER_5",
        data: { percentageOfGravel: 10, percentageOfSand: SECONDARY_MATERIAL_THRESHOLD_15, percentageOfSilt: 25, percentageOfClay: 50, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30, liquidLimit: LIQUID_LIMIT_THRESHOLD_50 - x, plasticityIndex: PLASTICITY_INDEX_LOWER_4 - x, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.ML },
    },
    {
        id: 55,
        expectedClassification: "ML-Sandy silt with gravel",
        edgeCaseDeltaInfo: "percentageOfSand is lower than percentageOfGravel",
        data: { percentageOfGravel: SECONDARY_MATERIAL_THRESHOLD_15, percentageOfSand: 25, percentageOfSilt: 10, percentageOfClay: 50, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30, liquidLimit: LIQUID_LIMIT_THRESHOLD_50 - x, plasticityIndex: PLASTICITY_INDEX_LOWER_4 - x, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.ML },
    },
    {
        id: 56,
        expectedClassification: "ML-Gravelly silt",
        edgeCaseDeltaInfo: "isSandBelowThreshold == false",
        data: { percentageOfGravel: 25 + x, percentageOfSand: SECONDARY_MATERIAL_THRESHOLD_15 - x, percentageOfSilt: 10, percentageOfClay: 50, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 - x, plasticityIndex: PLASTICITY_INDEX_LOWER_4 - x, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.ML },
    },
    {
        id: 57,
        expectedClassification: "ML-Gravelly silt with sand",
        edgeCaseDeltaInfo: "isSandBelowThreshold == false",
        data: { percentageOfGravel: 25, percentageOfSand: SECONDARY_MATERIAL_THRESHOLD_15, percentageOfSilt: 10, percentageOfClay: 50, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 - x, plasticityIndex: PLASTICITY_INDEX_LOWER_4 - x, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.ML },
    },

    {
        id: 58,
        expectedClassification: "OL-Highly Organic Soil (Peat)",
        edgeCaseDeltaInfo: "organic",
        data: { percentageOfGravel: 25, percentageOfSand: SECONDARY_MATERIAL_THRESHOLD_15, percentageOfSilt: 10, percentageOfClay: 50, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 - x, plasticityIndex: PLASTICITY_INDEX_LOWER_4 - x, percentageOfOrganicContent: ORGANIC_CONTENT_HIGH_30, atterbergLimitsSymbol: AtterbergLimitsSymbol.OL },
    },
    //#endregion
    

    //#region classifyFineGrainedSoilWithLiquidLimitAboveHalf
    {
        id: 59,
        expectedClassification: "CH-Fat clay",
        edgeCaseDeltaInfo: "LL >= 50",
        data: { percentageOfGravel: 5, percentageOfSand: 10, percentageOfSilt: 25, percentageOfClay: 60, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_LOWER_15 - x), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 , plasticityIndex: PLASTICITY_INDEX_UPPER_7 + x, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CH },
    },
    {
        id: 60,
        expectedClassification: "CH-Fat clay with sand",
        edgeCaseDeltaInfo: "percentagePassingSieveNo200",
        data: { percentageOfGravel: 5, percentageOfSand: 10, percentageOfSilt: 25, percentageOfClay: 60, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30 - x), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 , plasticityIndex: PLASTICITY_INDEX_UPPER_7 + x, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CH },
    },
    {
        id: 61,
        expectedClassification: "CH-Fat clay with gravel",
        edgeCaseDeltaInfo: "data.percentageOfSand >= data.percentageOfGravel",
        data: { percentageOfGravel: 10, percentageOfSand: 5, percentageOfSilt: 25, percentageOfClay: 60, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30 - x), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 , plasticityIndex: PLASTICITY_INDEX_UPPER_7 + x, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CH },
    },
    {
        id: 62,
        expectedClassification: "CH-Sandy fat clay",
        edgeCaseDeltaInfo: "false data.percentageOfSand >= data.percentageOfGravel",
        data: { percentageOfGravel: 10, percentageOfSand: SECONDARY_MATERIAL_THRESHOLD_15, percentageOfSilt: 25, percentageOfClay: 50, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30, liquidLimit: LIQUID_LIMIT_THRESHOLD_50 , plasticityIndex: PLASTICITY_INDEX_UPPER_7 + x, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CH },
    },
    {
        id: 63,
        expectedClassification: "CH-Sandy fat clay with gravel",
        edgeCaseDeltaInfo: "dataFinesPercentage >= FINES_LOWER_5",
        data: { percentageOfGravel: SECONDARY_MATERIAL_THRESHOLD_15, percentageOfSand: 25, percentageOfSilt: 10, percentageOfClay: 50, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30, liquidLimit: LIQUID_LIMIT_THRESHOLD_50 , plasticityIndex: PLASTICITY_INDEX_UPPER_7 + x, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CH },
    },
    {
        id: 64,
        expectedClassification: "CH-Gravelly fat clay",
        edgeCaseDeltaInfo: "percentageOfSand is lower than percentageOfGravel",
        data: { percentageOfGravel: 25 + x, percentageOfSand: SECONDARY_MATERIAL_THRESHOLD_15 - x, percentageOfSilt: 10, percentageOfClay: 50, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 , plasticityIndex: PLASTICITY_INDEX_UPPER_7 + x, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CH },
    },
    {
        id: 65,
        expectedClassification: "CH-Gravelly fat clay with sand",
        edgeCaseDeltaInfo: "percentageOfSand >= 15",
        data: { percentageOfGravel: 25, percentageOfSand: SECONDARY_MATERIAL_THRESHOLD_15, percentageOfSilt: 10, percentageOfClay: 50, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 , plasticityIndex: PLASTICITY_INDEX_UPPER_7 + x, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.CH },
    },

    // AtterbergLimitsSymbol.MH
    {
        id: 66,
        expectedClassification: "MH-Elastic silt",
        edgeCaseDeltaInfo: "AtterbergLimitsSymbol.MH",
        data: { percentageOfGravel: 5, percentageOfSand: 10, percentageOfSilt: 25, percentageOfClay: 60, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_LOWER_15 - x), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 , plasticityIndex: PLASTICITY_INDEX_UPPER_7, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.MH },
    },
    {
        id: 67,
        expectedClassification: "MH-Elastic silt with sand",
        edgeCaseDeltaInfo: "percentagePassingSieveNo200",
        data: { percentageOfGravel: 5, percentageOfSand: 10, percentageOfSilt: 25, percentageOfClay: 60, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30 - x), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 , plasticityIndex: PLASTICITY_INDEX_UPPER_7, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.MH },
    },
    {
        id: 68,
        expectedClassification: "MH-Elastic silt with gravel",
        edgeCaseDeltaInfo: "data.percentageOfSand >= data.percentageOfGravel",
        data: { percentageOfGravel: 10, percentageOfSand: 5, percentageOfSilt: 25, percentageOfClay: 60, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30 - x), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 , plasticityIndex: PLASTICITY_INDEX_UPPER_7, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.MH },
    },
    {
        id: 69,
        expectedClassification: "MH-Sandy elastic silt",
        edgeCaseDeltaInfo: "false data.percentageOfSand >= data.percentageOfGravel",
        data: { percentageOfGravel: 10, percentageOfSand: SECONDARY_MATERIAL_THRESHOLD_15, percentageOfSilt: 25, percentageOfClay: 50, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30, liquidLimit: LIQUID_LIMIT_THRESHOLD_50 , plasticityIndex: PLASTICITY_INDEX_UPPER_7, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.MH },
    },
    {
        id: 70,
        expectedClassification: "MH-Sandy elastic silt with gravel",
        edgeCaseDeltaInfo: "dataFinesPercentage >= FINES_LOWER_5",
        data: { percentageOfGravel: SECONDARY_MATERIAL_THRESHOLD_15, percentageOfSand: 25, percentageOfSilt: 10, percentageOfClay: 50, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30, liquidLimit: LIQUID_LIMIT_THRESHOLD_50 , plasticityIndex: PLASTICITY_INDEX_UPPER_7, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.MH },
    },
    {
        id: 71,
        expectedClassification: "MH-Gravelly elastic silt",
        edgeCaseDeltaInfo: "percentageOfSand is lower than percentageOfGravel",
        data: { percentageOfGravel: 25 + x, percentageOfSand: SECONDARY_MATERIAL_THRESHOLD_15 - x, percentageOfSilt: 10, percentageOfClay: 50, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 , plasticityIndex: PLASTICITY_INDEX_UPPER_7, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.MH },
    },
    {
        id: 72,
        expectedClassification: "MH-Gravelly elastic silt with sand",
        edgeCaseDeltaInfo: "percentageOfSand >= 15",
        data: { percentageOfGravel: 25, percentageOfSand: SECONDARY_MATERIAL_THRESHOLD_15, percentageOfSilt: 10, percentageOfClay: 50, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 , plasticityIndex: PLASTICITY_INDEX_UPPER_7, percentageOfOrganicContent: 0, atterbergLimitsSymbol: AtterbergLimitsSymbol.MH },
    },

    {
        id: 73,
        expectedClassification: "OH-Highly Organic Soil (Peat)",
        edgeCaseDeltaInfo: "organic",
        data: { percentageOfGravel: 25, percentageOfSand: SECONDARY_MATERIAL_THRESHOLD_15, percentageOfSilt: 10, percentageOfClay: 50, coefficientOfCurvature: 0, coefficientOfUniformity: 0, d10: 0, d30: 0, d60: 0, percentagePassingSieveNo200: 100 - (PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30), liquidLimit: LIQUID_LIMIT_THRESHOLD_50 , plasticityIndex: PLASTICITY_INDEX_LOWER_4 - x, percentageOfOrganicContent: ORGANIC_CONTENT_HIGH_30, atterbergLimitsSymbol: AtterbergLimitsSymbol.OH },
    }

    //#endregion
];