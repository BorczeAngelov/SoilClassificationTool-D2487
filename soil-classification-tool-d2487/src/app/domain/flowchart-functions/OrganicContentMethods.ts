import { SoilData } from "../SoilData";

export const ORGANIC_CONTENT_LOW_3 = 3;
export const ORGANIC_CONTENT_MEDIUM_15 = 15;
export const ORGANIC_CONTENT_HIGH_30 = 30;

export function getExtendedFineGrainedSoilGroupName_BasedOnOrganicContent(data: SoilData, groupName: string) {
    let extendedGroupName = groupName;

    if (data.percentageOfOrganicContent >= ORGANIC_CONTENT_LOW_3 && data.percentageOfOrganicContent <= ORGANIC_CONTENT_MEDIUM_15) {
        extendedGroupName += ' with organics';

    } else if (data.percentageOfOrganicContent > ORGANIC_CONTENT_MEDIUM_15 && data.percentageOfOrganicContent < ORGANIC_CONTENT_HIGH_30) {
        // Split the groupName into symbol and name parts based on the last "-"
        let lastDashIndex = groupName.lastIndexOf('-');
        let symbol = groupName.substring(0, lastDashIndex);
        let name = groupName.substring(lastDashIndex + 1);
        // Lowercase the first letter of the name
        name = name.charAt(0).toLowerCase() + name.slice(1);

        extendedGroupName = `${symbol}-Organic ${name}`;
    }

    return extendedGroupName;
}
