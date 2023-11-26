export type VerificationByGeotechnicalEngineerData = {
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