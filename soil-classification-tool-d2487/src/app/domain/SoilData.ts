export type SoilData = {
    percentageOfGravel: number; // Percentage of Gravel (G - Flowchart ASTM D2487-98)
    percentageOfSand: number; // Percentage of Sand (S - Flowchart ASTM D2487-98)
    percentageOfSilt: number; // Percentage of Silt (M - Flowchart ASTM D2487-98)
    percentageOfClay: number; // Percentage of Clay (C - Flowchart ASTM D2487-98)

    coefficientOfCurvature: number; // Coefficient of Curvature (Cc) - Optional
    coefficientOfUniformity: number; // Coefficient of Uniformity (Cu) - Optional

    // The diameter of soil particle corresponding to 10%, 30% and 60% finer respectively.
    d10: number; // d10 - Optional 
    d30: number; // d30 - Optional
    d60: number; // d60 - Optional

    percentagePassingSieveNo200: number; // Percentage Passing Sieve No.200

    liquidLimit: number; // Liquid Limit (LL)
    plasticityIndex: number; // Plasticity Index (PI)    
    percentageOfOrganicContent: number; // Percentage of Organic Content

    // TODO: should be an enum with selectable possible values
    atterbergLimitsSymbol: string; // Atterberg Limits Symbol
};