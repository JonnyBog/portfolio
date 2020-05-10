import createTypes from '.';

describe('Types: create request', () => {
    it('should return undefined if there is no name', () => {
        expect(createTypes(undefined)).toBeUndefined();
    });

    it('should return types when there is a name', () => {
        expect(createTypes('test')).toEqual({
            error: 'FETCH_TEST_ERROR',
            pending: 'FETCH_TEST',
            reset: 'FETCH_TEST_RESET',
            success: 'FETCH_TEST_SUCCESS'
        });
    });
});
