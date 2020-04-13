import getPredicateHelper from '../../../lib/helpers/get-predicate';

import selectors from '.';

describe('Selectors: projects', () => {
    describe('getPredicate', () => {
        it('returns the default state', () => {
            expect(selectors.getPredicate()).toEqual(getPredicateHelper());
        });

        it('returns the correct state', () => {
            expect(
                selectors.getPredicate({
                    projects: {
                        isInitial: 'isInitial',
                        isPending: 'isPending',
                        hasError: 'hasError'
                    }
                })
            ).toEqual(
                getPredicateHelper({
                    isInitial: 'isInitial',
                    isPending: 'isPending',
                    hasError: 'hasError',
                    data: ''
                })
            );
        });
    });

    describe('getProjects', () => {
        it('returns the default state', () => {
            expect(selectors.getProjects()).toEqual([]);
        });

        it('returns the correct state', () => {
            expect(
                selectors.getProjects({
                    projects: {
                        data: 'test'
                    }
                })
            ).toEqual('test');
        });
    });
});
