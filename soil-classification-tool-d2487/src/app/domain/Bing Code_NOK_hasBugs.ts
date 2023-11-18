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

function classifySoilWithD2487Standard(data: SoilData): string {
  if (data.percentagePassingSieveNo200 < GRAIN_SIZE_THRESHOLD) {
    return classifyCoarseGrainedSoil(data);
  } else {
    return classifyFineGrainedSoil(data);
  }
}

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
  let groupName = "";

  if (data.percentagePassingSieveNo200 > FINES_THRESHOLD) {
    if (data.plasticityIndex < LOWER_PLASTICITY_INDEX_THRESHOLD) {
      groupName = "GM-Silty gravel";
    } else if (data.plasticityIndex >= UPPER_PLASTICITY_INDEX_THRESHOLD) {
      groupName = "GC-Clayey gravel";
    } else {
      groupName = "GM-GC-Silty-clayey gravel";
    }
  } else {
    if (
      data.coefficientOfUniformity >= COEFFICIENT_OF_UNIFORMITY_THRESHOLD &&
      data.coefficientOfCurvature >= LOWER_COEFFICIENT_OF_CURVATURE_THRESHOLD &&
      data.coefficientOfCurvature <= UPPER_COEFFICIENT_OF_CURVATURE_THRESHOLD
    ) {
      groupName = "GW-Well-graded gravel";
    } else {
      groupName = "GP-Poorly-graded gravel";
    }
  }

  groupName = extendNameIfNeeded_Sand(data, groupName);

  return groupName;
}

function classifyCoarseGrainedSoilWithSandDominantMaterial(
  data: SoilData
): string {
  let groupName = "";

  if (data.percentagePassingSieveNo200 > FINES_THRESHOLD) {
    if (data.plasticityIndex < LOWER_PLASTICITY_INDEX_THRESHOLD) {
      groupName = "SM-Silty sand";
    } else if (data.plasticityIndex >= UPPER_PLASTICITY_INDEX_THRESHOLD) {
      groupName = "SC-Clayey sand";
    } else {
      groupName = "SM-SC-Silty-clayey sand";
    }
  } else {
    if (
      data.coefficientOfUniformity >= COEFFICIENT_OF_UNIFORMITY_THRESHOLD &&
      data.coefficientOfCurvature >= LOWER_COEFFICIENT_OF_CURVATURE_THRESHOLD &&
      data.coefficientOfCurvature <= UPPER_COEFFICIENT_OF_CURVATURE_THRESHOLD
    ) {
      groupName = "SW-Well-graded sand";
    } else {
      groupName = "SP-Poorly-graded sand";
    }
  }

  groupName = extendNameIfNeeded_Gravel(data, groupName);

  return groupName;
}

function classifyFineGrainedSoil(data: SoilData): string {
  if (data.liquidLimit > LIQUID_LIMIT_THRESHOLD) {
    return classifyFineGrainedSoilWithLiquidLimitAbove(data);
  } else {
    return classifyFineGrainedSoilWithLiquidLimitBelow(data);
  }
}

function classifyFineGrainedSoilWithLiquidLimitBelow(data: SoilData): string {
  let groupName = "";

  if (data.percentagePassingSieveNo200 < COARSE_FRACTION_THRESHOLD) {
    if (data.plasticityIndex < UPPER_PLASTICITY_INDEX_THRESHOLD) {
      groupName = "CL-Lean clay";
    } else {
      groupName = "CL-ML-Lean clay-silt mixture";
    }
  } else {
    groupName = "ML-Silt";
  }

  // TODO: check the dominant values
  groupName = extendNameIfNeeded_Sand(data, groupName);
  groupName = extendNameIfNeeded_Gravel(data, groupName);

  return groupName;
}

function classifyFineGrainedSoilWithLiquidLimitAbove(data: SoilData): string {
  let groupName = "";

  if (data.percentagePassingSieveNo200 < COARSE_FRACTION_THRESHOLD) {
    if (data.plasticityIndex < UPPER_PLASTICITY_INDEX_THRESHOLD) {
      groupName = "CH-Fat clay";
    } else {
      groupName = "CH-MH-Fat clay-elastic silt mixture";
    }
  } else {
    groupName = "MH-Elastic silt";
  }

  groupName = extendNameIfNeeded_Sand(data, groupName);
  groupName = extendNameIfNeeded_Gravel(data, groupName);

  return groupName;
}

function extendNameIfNeeded_Sand(data: SoilData, groupName: string): string {
  if (data.percentageOfSand > COARSE_FRACTION_THRESHOLD) {
    groupName += " with sand";
  }
  return groupName;
}

// Function to extend the group name if the soil contains more than 15% gravel
function extendNameIfNeeded_Gravel(data: SoilData, groupName: string): string {
  if (data.percentageOfGravel > COARSE_FRACTION_THRESHOLD) {
    groupName += " with gravel";
  }
  return groupName;
}
