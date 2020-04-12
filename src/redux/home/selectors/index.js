import { createSelector } from 'reselect';

import getPredicateHelper from '../../../lib/helpers/get-predicate';

const getPredicate = createSelector(
    [(state) => getPredicateHelper(state?.home)],
    (predicate) => ({
        ...predicate
    })
);

const getDescription = ({ home } = {}) => home?.data?.acf?.description;
const getHeading = ({ home } = {}) => home?.data?.acf?.heading;

const getSimple = createSelector(
    [getDescription, getHeading],
    (description, heading) => ({
        description,
        heading
    })
);

export default {
    getPredicate,
    getSimple
};
