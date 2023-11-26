export type VerificationByGeotechnicalEngineerData = {
    [key: string]: any; //[key: string]: any; is an index signature. It tells TypeScript that a VerificationByGeotechnicalEngineerData object can have any number of properties with string keys and values of any type.

    dateOfTesting: Date;
    geotechnicalEngineer: string;
    classificationBySoftware: string;
    classificationByEngineer: string;
    doesClassificationMatch: boolean;
    commentByEngineer: string;
    geotechnicalEngineerCompany: string;
    geotechnicalEngineerContact: string;

    // same properties as SoilData
    percentageOfGravel: number;
    percentageOfSand: number;
    percentageOfSilt: number;
    percentageOfClay: number;
    coefficientOfCurvature: number;
    coefficientOfUniformity: number;
    d10: number;
    d30: number;
    d60: number;
    percentagePassingSieveNo200: number;
    liquidLimit: number;
    plasticityIndex: number;
    atterbergLimitsSymbol: string;
    percentageOfOrganicContent: number;
};