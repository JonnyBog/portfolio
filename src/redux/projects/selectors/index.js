import { createSelector } from 'reselect';

import getPredicateHelper from '../../../lib/helpers/get-predicate';

const getPredicate = createSelector(
    [(state) => getPredicateHelper(state?.projects)],
    (predicate) => ({
        ...predicate
    })
);

const getProjects = createSelector(
    [(state) => state?.projects?.data || []],
    (projects) => projects
);

export default {
    getPredicate,
    getProjects
};
