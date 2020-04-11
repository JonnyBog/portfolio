import {
    FETCH_CONTACT,
    FETCH_CONTACT_SUCCESS,
    FETCH_CONTACT_ERROR
} from '../../actions/contact-actions/types';
import contactReducer, { initialState } from '.';


describe('Reducers: Contact', () => {
    it('should return the initial state', () => {
        expect(contactReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle FETCH_CONTACT', () => {
        expect(
            contactReducer(undefined, {
                type: FETCH_CONTACT
            })
        ).toEqual({
            ...initialState,
            isInitial: false,
            isPending: true
        });
    });

    it('should handle FETCH_CONTACT_SUCCESS', () => {
        expect(
            contactReducer(undefined, {
                type: FETCH_CONTACT_SUCCESS,
                data: ['test']
            })
        ).toEqual({
            ...initialState,
            isInitial: false,
            isPending: false,
            data: 'test'
        });
    });

    it('should handle FETCH_CONTACT_ERROR', () => {
        expect(
            contactReducer(undefined, {
                type: FETCH_CONTACT_ERROR
            })
        ).toEqual({
            ...initialState,
            isInitial: false,
            isPending: false,
            hasError: true
        });
    });
});
