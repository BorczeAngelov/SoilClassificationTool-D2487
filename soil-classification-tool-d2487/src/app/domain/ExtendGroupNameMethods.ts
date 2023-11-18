// Implementation is based on: JCE_66_2014_9_2_1077_EN.pdf
// Group 1: Criteria that involve extending the name of the soil group with additional modifiers based on the composition or characteristics of the soil. These are footnotes [B], [D], [G], [H], [K], [L], and [M].
// Group 2: Criteria that involve assigning double symbols to the soil group based on the percentage of fine grains. These are footnotes [E], [F], and [I].
// Group 3: Criteria that involve handling cases where the soil has different values of IP and wL in the plasticity diagram. These are footnotes [J], [N], [O], [P], and [Q].
// Group 4: Criteria that involve calculating cu and cc based on the size distribution of the soil. This is footnote [C].
// Group 5: Criteria that involve accepting soil materials as input based on the sieve size. This is footnote [A].
// Acceptance criteria:
// - Footnote [A]: The function should accept soil materials as input, which have passed through a sieve of 3-in, 75 mm.
// - Footnote [B]: If the soil samples contain pieces or blocks or both, the function should extend the name of the soil group with “with pieces” or “with blocks” or “with pieces and blocks”.
// - Footnote [C]: The function should be able to calculate cu and cc based on the formula cu = D60/D10; cc = (D30)2/(D10xD60)[1].
// - Footnote [D]: If the soil contains ≥ 15 % of sand, the function should extend the name of the soil group with “with sand”.
// - Footnote [E]: The function should be able to assign double symbols to gravels with 5 to 12 % fine grains⁴[4].
// - Footnote [F]: If fine grains are classified as CL-ML then double symbols GC-GM or SC-SM should be used⁵[5].
// - Footnote [G]: If fine grains are organic the function should extend the name of the soil group by adding “with organic fine grains”.
// - Footnote [H]: If the soil contains ≥ 15 % of gravel the function should extend the name of the soil group by adding “with gravel”.
// - Footnote [I]: The function should be able to assign double symbols to sand with 5 to 12 % of fine grains.
// - Footnote [J]: If a pair of values (wL, IP) in the plasticity diagram is situated within the hatched area (4 < IP < 7), the soil should be designated as CL-ML, as silty clay.
// - Footnote [K]: If the soil contains 15 to 30 % of material above the sieve No… 200 – 0.075 mm, the function should extend the name of the soil group by adding “with sand” or “with gravel”, depending on which of these two materials is dominant.
// - Footnote [L]: If the soil contains ≥ 30 % of material above the sieve No. 200 – 0.075 mm, and if the sand is dominant, the function should extend the name of the soil group by adding “sandy”.
// - Footnote [M]: If the soil contains ≥ 30 % of material above the sieve No… 200 – 0.075 mm, and if the gravel is dominant, the function should extend the name of the soil group by adding “gravelly”.
// - Footnote [N]: The function should be able to handle cases where IP ≥ 4 and at or above the A-line.
// - Footnote [O]: The function should be able to handle cases where IP < 4 or below the A-line.
// - Footnote [P]: The function should be able to handle cases where IP at or above the A-line.
// - Footnote [Q]: The function should be able to handle cases where IP below the A-line.


// CriteriaClassificationThresholds
const ExtendGroupName_SAND_THRESHOLD = 15;
const ExtendGroupName_ORGANIC_THRESHOLD = 0;
const ExtendGroupName_GRAVEL_THRESHOLD = 15;
const ExtendGroupName_SIEVE_NO_200_THRESHOLD = 30;
const ExtendGroupName_SIEVE_NO_200_LOWER_THRESHOLD = 15;

class ExtendGroupNameMethods {

  // - Footnote [D]: If the soil contains ≥ 15 % of sand, the function should extend the name of the soil group with “with sand”.
  ExtendGroupName_FootnoteD(soilData: SoilData): string {
    let hasSand = soilData.percentageOfSand >= ExtendGroupName_SAND_THRESHOLD;
    if (hasSand) {
      return " with sand";
    } else {
      return "";
    }
  }

  // - Footnote [G]: If fine grains are organic the function should extend the name of the soil group by adding “with organic fine grains”.
  ExtendGroupName_FootnoteG(soilData: SoilData): string {
    let isOrganic = soilData.percentageOfOrganicContent > ExtendGroupName_ORGANIC_THRESHOLD;
    if (isOrganic) {
      return " with organic fine grains";
    } else {
      return "";
    }
  }

  // - Footnote [H]: If the soil contains ≥ 15 % of gravel the function should extend the name of the soil group by adding “with gravel”.
  ExtendGroupName_FootnoteH(soilData: SoilData): string {
    let hasGravel = soilData.percentageOfGravel >= ExtendGroupName_GRAVEL_THRESHOLD;
    if (hasGravel) {
      return " with gravel";
    } else {
      return "";
    }
  }

  // - Footnote [K]: If the soil contains 15 to 30 % of material above the sieve No… 200 – 0.075 mm, the function should extend the name of the soil group by adding “with sand” or “with gravel”, depending on which of these two materials is dominant.
  ExtendGroupName_FootnoteK(soilData: SoilData): string {
    let percentageAboveSieve = 100 - soilData.percentagePassingSieveNo200;
    let isInRange = percentageAboveSieve >= ExtendGroupName_SIEVE_NO_200_LOWER_THRESHOLD && percentageAboveSieve <= ExtendGroupName_SIEVE_NO_200_THRESHOLD;
    if (isInRange) {
      if (soilData.percentageOfSand > soilData.percentageOfGravel) {
        return " with sand";
      } else {
        return " with gravel";
      }
    } else {
      return "";
    }
  }

  // - Footnote [L]: If the soil contains ≥ 30 % of material above the sieve No. 200 – 0.075 mm, and if the sand is dominant, the function should extend the name of the soil group by adding “sandy”.
  ExtendGroupName_FootnoteL(soilData: SoilData): string {
    let percentageAboveSieve = 100 - soilData.percentagePassingSieveNo200;
    let isSandDominant = soilData.percentageOfSand > soilData.percentageOfGravel;
    let isConditionMet = percentageAboveSieve >= ExtendGroupName_SIEVE_NO_200_THRESHOLD && isSandDominant;
    if (isConditionMet) {
      return " sandy";
    } else {
      return "";
    }
  }

  // - Footnote [M]: If the soil contains ≥ 30 % of material above the sieve No… 200 – 0.075 mm, and if the gravel is dominant, the function should extend the name of the soil group by adding “gravelly”.
  ExtendGroupName_FootnoteM(soilData: SoilData): string {
    let percentageAboveSieve = 100 - soilData.percentagePassingSieveNo200;
    let isGravelDominant = soilData.percentageOfGravel > soilData.percentageOfSand;
    let isConditionMet = percentageAboveSieve >= ExtendGroupName_SIEVE_NO_200_THRESHOLD && isGravelDominant;
    if (isConditionMet) {
      return " gravelly";
    } else {
      return "";
    }
  }
}
