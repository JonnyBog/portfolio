import { createSelector } from 'reselect';

const getProjects = createSelector(
    [(state) => state?.projects?.data || []],
    (projects) => projects
);

export default {
    getProjects
};
