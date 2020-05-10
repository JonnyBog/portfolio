import { createSelector } from 'reselect';

import getPredicateHelper from '../../get-predicate';

const getPredicate = (name) =>
    createSelector(
        [(state) => getPredicateHelper(state?.[name])],
        (predicate) => ({
            ...predicate
        })
    );

export default (name) => ({
    getPredicate: getPredicate(name)
});
