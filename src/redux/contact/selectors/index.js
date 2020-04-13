import { createSelector } from 'reselect';

import getPredicateHelper from '../../../lib/helpers/get-predicate';

const getPredicate = createSelector(
    [(state) => getPredicateHelper(state?.contact)],
    (predicate) => ({
        ...predicate
    })
);

const getDescription = ({ contact } = {}) => contact?.data?.acf?.description;
const getNumber = ({ contact } = {}) => contact?.data?.acf?.number;
const getEmail = ({ contact } = {}) => contact?.data?.acf?.email;

const getSimple = createSelector(
    [getDescription, getNumber, getEmail],
    (description, number, email) => ({
        description,
        number,
        email
    })
);

export default {
    getPredicate,
    getSimple
};
