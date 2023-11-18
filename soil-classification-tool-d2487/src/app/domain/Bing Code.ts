// Constants for the soil classification criteria
const GRAIN_SIZE_THRESHOLD = 50; // Percentage of soil passing 0.075 mm sieve
const COARSE_FRACTION_THRESHOLD = 15; // Percentage of coarse fraction in fine-grained soil
const FINES_THRESHOLD = 5; // Percentage of fines in coarse-grained soil
const COEFFICIENT_OF_UNIFORMITY_THRESHOLD = 4; // Coefficient of uniformity for well-graded soil
const LOWER_COEFFICIENT_OF_CURVATURE_THRESHOLD = 1; // Lower bound of coefficient of curvature for well-graded soil
const UPPER_COEFFICIENT_OF_CURVATURE_THRESHOLD = 3; // Upper bound of coefficient of curvature for well-graded soil
const LIQUID_LIMIT_THRESHOLD = 50; // Liquid limit for high plasticity soil
const LOWER_PLASTICITY_INDEX_THRESHOLD = 4; // Lower bound of plasticity index for silty soil
const UPPER_PLASTICITY_INDEX_THRESHOLD = 7; // Upper bound of plasticity index for clayey soil
const ORGANIC_CONTENT_THRESHOLD = 4; // Percentage of organic content for organic soil

function classifySoilWithD2487Standard(data: SoilData): string {
  if (data.percentagePassingSieveNo200 > GRAIN_SIZE_THRESHOLD) {
    return classifyFineGrainedSoil(data);
  } else {
    return classifyCoarseGrainedSoil(data);
  }
}

// Function to classify coarse-grained soil
function classifyCoarseGrainedSoil(data: SoilData): string {
  if (data.percentageOfGravel > data.percentageOfSand) {
    return classifyCoarseGrainedSoilWithGravelDominantMaterial(data);
  } else {
    return classifyCoarseGrainedSoilWithSandDominantMaterial(data);
  }
}

function classifyCoarseGrainedSoilWithGravelDominantMaterial(
  data: SoilData
): string {
  if (data.percentagePassingSieveNo200 > FINES_THRESHOLD) {
    if (data.plasticityIndex < LOWER_PLASTICITY_INDEX_THRESHOLD) {
      return "GM-Silty gravel";
    } else if (data.plasticityIndex >= UPPER_PLASTICITY_INDEX_THRESHOLD) {
      return "GC-Clayey gravel";
    } else {
      return "GM-GC-Silty-clayey gravel";
    }
  } else {
    if (
      data.coefficientOfUniformity >= COEFFICIENT_OF_UNIFORMITY_THRESHOLD &&
      data.coefficientOfCurvature >= LOWER_COEFFICIENT_OF_CURVATURE_THRESHOLD &&
      data.coefficientOfCurvature <= UPPER_COEFFICIENT_OF_CURVATURE_THRESHOLD
    ) {
      return "GW-Well-graded gravel";
    } else {
      return "GP-Poorly-graded gravel";
    }
  }
}

function classifyCoarseGrainedSoilWithSandDominantMaterial(
  data: SoilData
): string {
  if (data.percentagePassingSieveNo200 > FINES_THRESHOLD) {
    if (data.plasticityIndex < LOWER_PLASTICITY_INDEX_THRESHOLD) {
      return "SM-Silty sand";
    } else if (data.plasticityIndex >= UPPER_PLASTICITY_INDEX_THRESHOLD) {
      return "SC-Clayey sand";
    } else {
      return "SM-SC-Silty-clayey sand";
    }
  } else {
    if (
      data.coefficientOfUniformity >= COEFFICIENT_OF_UNIFORMITY_THRESHOLD &&
      data.coefficientOfCurvature >= LOWER_COEFFICIENT_OF_CURVATURE_THRESHOLD &&
      data.coefficientOfCurvature <= UPPER_COEFFICIENT_OF_CURVATURE_THRESHOLD
    ) {
      return "SW-Well-graded sand";
    } else {
      return "SP-Poorly-graded sand";
    }
  }
}

function classifyFineGrainedSoil(data: SoilData): string {
  if (data.liquidLimit > LIQUID_LIMIT_THRESHOLD) {
    return classifyFineGrainedSoilWithLiquidLimitAbove(data);
  } else {
    return classifyFineGrainedSoilWithLiquidLimitBelow(data);
  }
}

// Function to classify fine-grained soil with liquid limit below 50
function classifyFineGrainedSoilWithLiquidLimitBelow(data: SoilData): string {
  if (data.percentagePassingSieveNo200 < COARSE_FRACTION_THRESHOLD) {
    if (data.plasticityIndex < UPPER_PLASTICITY_INDEX_THRESHOLD) {
      return "CL-Lean clay";
    } else {
      return "CL-ML-Lean clay-silt mixture";
    }
  } else {
    return "ML-Silt";
  }
}

// Function to classify fine-grained soil with liquid limit above 50
function classifyFineGrainedSoilWithLiquidLimitAbove(data: SoilData): string {
  if (data.percentagePassingSieveNo200 < COARSE_FRACTION_THRESHOLD) {
    if (data.plasticityIndex < UPPER_PLASTICITY_INDEX_THRESHOLD) {
      return "CH-Fat clay";
    } else {
      return "CH-MH-Fat clay-elastic silt mixture";
    }
  } else {
    return "MH-Elastic silt";
  }
}
