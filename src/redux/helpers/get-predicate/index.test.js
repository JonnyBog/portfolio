import getPredicateHelper from '.';

describe('Helpers: getPredicate', () => {
    it('returns the correct predicate when nothing is passed', () => {
        expect(getPredicateHelper()).toEqual({
            isInitial: undefined,
            isPending: undefined,
            hasError: undefined
        });
    });

    it('returns the correct predicate', () => {
        expect(
            getPredicateHelper({
                isInitial: 'isInitial',
                isPending: 'isPending',
                hasError: 'hasError',
                something: 'test'
            })
        ).toEqual({
            isInitial: 'isInitial',
            isPending: 'isPending',
            hasError: 'hasError'
        });
    });
});
