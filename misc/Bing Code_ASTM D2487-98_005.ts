// link 1: https://en.wikipedia.org/wiki/Unified_Soil_Classification_System
// link 2: https://dot.ca.gov/-/media/dot-media/programs/maintenance/documents/office-of-concrete-pavement/pavement-foundations/uscs-a11y.pdf

enum SoilClassification {
  GW = 'GW', // Well-graded gravels, gravel-sand mixtures, little or no fines
  GP = 'GP', // Poorly-graded gravels, gravel-sand mixtures, little or no fines
  GM = 'GM', // Silty gravels, gravel-sand-silt mixtures
  GC = 'GC', // Clayey gravels, gravel-sand-clay mixtures
  SW = 'SW', // Well-graded sands, gravelly sands, little or no fines
  SP = 'SP', // Poorly graded sands, gravelly sands, little or no fines
  SM = 'SM', // Silty sands, sand-silt mixtures
  SC = 'SC', // Clayey sands, sand-clay mixtures
  ML = 'ML', // Inorganic silts and very fine sands, rock flour, silty of clayey fine sands or clayey silts with slight plasticity
  CL = 'CL', // Inorganic clays of low to medium plasticity, gravelly clays, sandy clays, silty clays, lean clays
  OL = 'OL', // Organic silts and organic silty clays of low plasticity
  MH = 'MH', // Inorganic silts, micaceous or diatomaceous fine sandy or silty soils, elastic silts
  CH = 'CH', // Inorganic clays of high plasticity, fat clays
  OH = 'OH', // Organic clays of medium to high plasticity, organic silts
  PT = 'PT'  // Peat and other highly organic soils
}

type SoilData = {
  percentagePassing75mm: number; // Percentage of soil particles passing a 75mm sieve
  percentagePassing475mm: number; // Percentage of soil particles passing a 4.75mm sieve
  percentagePassing0075mm: number; // Percentage of soil particles passing a 0.075mm sieve
  coefficientOfCurvature: number; // Measure of the gradation curve's shape in the finer portion
  coefficientOfUniformity: number; // Measure of the soil's particle size uniformity
  liquidLimit: number; // Water content at which soil changes from plastic to liquid state
  plasticityIndex: number; // Range of water contents where soil exhibits plastic properties
  organicContent: boolean; // Whether the soil contains organic material
};

const GRAIN_SIZE_THRESHOLD = 50;
const LIQUID_LIMIT_THRESHOLD = 50;
const PLASTICITY_INDEX_THRESHOLD = 7;
const LOWER_PLASTICITY_INDEX_THRESHOLD = 4;
const COEFFICIENT_OF_UNIFORMITY_THRESHOLD = 4;
const LOWER_COEFFICIENT_OF_CURVATURE_THRESHOLD = 1;
const UPPER_COEFFICIENT_OF_CURVATURE_THRESHOLD = 3;
const PERCENTAGE_PASSING_THRESHOLD = 5;

function USCS_D2487SoilClassification(data: SoilData): SoilClassification {
  if (data.percentagePassing0075mm > GRAIN_SIZE_THRESHOLD) {
    return classifyFineGrainedSoil(data);
  } else {
    return classifyCoarseGrainedSoil(data);
  }
}

function classifyFineGrainedSoil(data: SoilData): SoilClassification {
  if (data.liquidLimit < LIQUID_LIMIT_THRESHOLD) {
    if (data.plasticityIndex > PLASTICITY_INDEX_THRESHOLD) {
      return SoilClassification.CL;
    } else {
      if (data.plasticityIndex < LOWER_PLASTICITY_INDEX_THRESHOLD) {
        if (data.organicContent) {
          return SoilClassification.OL;
        } else {
          return SoilClassification.ML;
        }
      } else {
        return SoilClassification.OL;
      }
    }
  } else {
    if (data.plasticityIndex > PLASTICITY_INDEX_THRESHOLD) {
      return SoilClassification.CH;
    } else {
      if (data.plasticityIndex < LOWER_PLASTICITY_INDEX_THRESHOLD) {
        if (data.organicContent) {
          return SoilClassification.OH;
        } else {
          return SoilClassification.MH;
        }
      } else {
        return SoilClassification.OH;
      }
    }
  }
}

function classifyCoarseGrainedSoil(data: SoilData): SoilClassification {
  if (data.coefficientOfUniformity > COEFFICIENT_OF_UNIFORMITY_THRESHOLD && data.coefficientOfCurvature > LOWER_COEFFICIENT_OF_CURVATURE_THRESHOLD && data.coefficientOfCurvature < UPPER_COEFFICIENT_OF_CURVATURE_THRESHOLD) {
    if (data.percentagePassing475mm > GRAIN_SIZE_THRESHOLD) {
      return SoilClassification.GW;
    } else {
      return SoilClassification.SW;
    }
  } else {
    if (data.percentagePassing475mm > GRAIN_SIZE_THRESHOLD) {
      if (data.percentagePassing0075mm < PERCENTAGE_PASSING_THRESHOLD) {
        return SoilClassification.GP;
      } else {
        if (data.plasticityIndex < LOWER_PLASTICITY_INDEX_THRESHOLD) {
          return SoilClassification.GM;
        } else {
          return SoilClassification.GC;
        }
      }
    } else {
      if (data.percentagePassing0075mm < PERCENTAGE_PASSING_THRESHOLD) {
        return SoilClassification.SP;
      } else {
        if (data.plasticityIndex < LOWER_PLASTICITY_INDEX_THRESHOLD) {
          return SoilClassification.SM;
        } else {
          return SoilClassification.SC;
        }
      }
    }
  }
}

// Overloaded function
function USCS_D2487SoilClassification_Ex(
  percentagePassing75mm: number,
  percentagePassing475mm: number,
  percentagePassing0075mm: number,
  coefficientOfCurvature: number,
  coefficientOfUniformity: number,
  liquidLimit: number,
  plasticityIndex: number,
  organicContent: boolean
): SoilClassification {
  const data: SoilData = {
    percentagePassing75mm,
    percentagePassing475mm,
    percentagePassing0075mm,
    coefficientOfCurvature,
    coefficientOfUniformity,
    liquidLimit,
    plasticityIndex,
    organicContent
  };
  return USCS_D2487SoilClassification(data);
}