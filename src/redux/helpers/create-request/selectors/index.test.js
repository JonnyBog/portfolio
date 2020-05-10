import getPredicateHelper from '../../get-predicate';
import selectors from '.';

describe('Selectors: create request', () => {
    describe('getPredicate', () => {
        const name = 'test';
        it('returns the default state', () => {
            expect(selectors(name).getPredicate()).toEqual(
                getPredicateHelper()
            );
        });

        it('returns the correct state', () => {
            expect(
                selectors(name).getPredicate({
                    [name]: {
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
});
