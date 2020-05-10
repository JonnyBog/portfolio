import createTypes from '../types';
import createReducer, { initialState } from '.';

describe('Reducers: create request', () => {
    const name = 'test';
    const types = createTypes(name);
    const { pending, success, error, reset } = types;
    const reducer = createReducer(types);

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle pending', () => {
        expect(
            reducer(undefined, {
                type: pending
            })
        ).toEqual({
            ...initialState,
            isPending: true,
            isInitial: false
        });
    });

    it('should handle success', () => {
        expect(
            reducer(undefined, {
                type: success,
                data: 'test'
            })
        ).toEqual({
            ...initialState,
            isInitial: false,
            isPending: false,
            data: 'test'
        });
    });

    it('should handle error', () => {
        expect(
            reducer(undefined, {
                type: error
            })
        ).toEqual({
            ...initialState,
            isInitial: false,
            isPending: false,
            hasError: true
        });
    });

    it('should handle reset', () => {
        expect(
            reducer(undefined, {
                type: reset
            })
        ).toEqual({
            ...initialState,
            isInitial: true,
            data: initialState.data
        });
    });
});
