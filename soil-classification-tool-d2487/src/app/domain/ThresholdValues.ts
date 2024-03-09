// SoilClassificationService
export const GRAIN_SIZE_THRESHOLD_50 = 50; // Way to determine flowchart function according to D2487-98 standard
export const LIQUID_LIMIT_THRESHOLD_50 = 50; // Liquid limit for high plasticity soil

// classifyCoarseGrainedSoilWithDominantMaterialGravel
export const FINES_LOWER_5 = 5;
export const FINES_UPPER_12 = 12;
export const COEFFICIENT_OF_UNIFORMITY_4 = 4;
export const COEFFICIENT_OF_CURVATURE_LOWER_1 = 1;
export const COEFFICIENT_OF_CURVATURE_UPPER_3 = 3;
export const SAND_THRESHOLD_15 = 15;

// classifyCoarseGrainedSoilWithDominantMaterialSand
// const FINES_LOWER_5 = 5;
// const FINES_UPPER_12 = 12;
export const COEFFICIENT_OF_UNIFORMITY_6 = 6;
// const COEFFICIENT_OF_CURVATURE_LOWER_1 = 1;
// const COEFFICIENT_OF_CURVATURE_UPPER_3 = 3;
export const GRAVEL_THRESHOLD_15 = 15;

// classifyFineGrainedSoilWithLiquidLimitAboveHalf
export const PERCENTAGE_PASSING_SIEVE_NO200_LOWER_15 = 15;
export const PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30 = 30;
export const SECONDARY_MATERIAL_THRESHOLD_15 = 15;


// classifyFineGrainedSoilWithLiquidLimitBelowHalf
export const PLASTICITY_INDEX_LOWER_4 = 4;
export const PLASTICITY_INDEX_UPPER_7 = 7;
// export const PERCENTAGE_PASSING_SIEVE_NO200_LOWER_15 = 15;
// export const PERCENTAGE_PASSING_SIEVE_NO200_UPPER_30 = 30;
// export const SECONDARY_MATERIAL_THRESHOLD_15 = 15;

// getExtendedFineGrainedSoilGroupName_BasedOnOrganicContent
export const ORGANIC_CONTENT_LOW_3 = 3;
export const ORGANIC_CONTENT_MEDIUM_15 = 15;
export const ORGANIC_CONTENT_HIGH_30 = 30;