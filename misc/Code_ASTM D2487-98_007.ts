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
  percentageOfGravel: number; // Percentage of Gravel (G - Flowchart ASTM D2487-98)
  percentageOfSand: number; // Percentage of Sand (S - Flowchart ASTM D2487-98)
  percentageOfSilt: number; // Percentage of Silt (M - Flowchart ASTM D2487-98)
  percentageOfClay: number; // Percentage of Clay (C - Flowchart ASTM D2487-98)
  coefficientOfCurvature: number; // Coefficient of Curvature (Cc) - Optional
  coefficientOfUniformity: number; // Coefficient of Uniformity (Cu) - Optional
  d10: number; // d10 - Optional
  d30: number; // d30 - Optional
  d60: number; // d60 - Optional
  percentagePassingSieveNo200: number; // Percentage Passing Sieve No.200
  liquidLimit: number; // Liquid Limit (LL)
  plasticityIndex: number; // Plasticity Index (PI)
  atterbergLimitsSymbol: string; // Atterberg Limits Symbol
  percentageOfOrganicContent: number; // Percentage of Organic Content
};



// CriteriaClassificationThresholds
const GRAIN_SIZE_THRESHOLD = 50;
const LIQUID_LIMIT_THRESHOLD = 50; // Water content at which soil changes from plastic to liquid state
const PLASTICITY_INDEX_THRESHOLD = 7; // Range of water contents where soil exhibits plastic properties
const LOWER_PLASTICITY_INDEX_THRESHOLD = 4;
const COEFFICIENT_OF_UNIFORMITY_THRESHOLD = 4; // Measure of the soil's particle size uniformity
const LOWER_COEFFICIENT_OF_CURVATURE_THRESHOLD = 1; // Measure of the gradation curve's shape in the finer portion
const UPPER_COEFFICIENT_OF_CURVATURE_THRESHOLD = 3; // Upper threshold for gradation curve's shape in soil classification
const PERCENTAGE_PASSING_THRESHOLD = 5; // Percentage of soil particles passing a certain sieve size


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
  if (data.coefficientOfUniformity > COEFFICIENT_OF_UNIFORMITY_THRESHOLD && 
      data.coefficientOfCurvature > LOWER_COEFFICIENT_OF_CURVATURE_THRESHOLD && 
      data.coefficientOfCurvature < UPPER_COEFFICIENT_OF_CURVATURE_THRESHOLD) {
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
