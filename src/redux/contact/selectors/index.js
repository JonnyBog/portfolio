import { createSelector } from 'reselect';

const getDescription = (state) => state?.home?.acf?.description;
const getHeading = (state) => state?.home?.acf?.heading;

export const getHomeSimple = createSelector(
    [getDescription, getHeading],
    (description, heading) => ({
        description,
        heading
    })
);
