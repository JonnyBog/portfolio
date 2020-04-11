import {
    FETCH_CONTACT,
    FETCH_CONTACT_SUCCESS,
    FETCH_CONTACT_ERROR
} from '../../actions/contact-actions/types';

export const initialState = {
    isInitial: true,
    isPending: false,
    data: [],
    hasError: false
};

function contact(state = initialState, { type, data }) {
    switch (type) {
        case FETCH_CONTACT:
            return {
                ...state,
                isPending: true,
                isInitial: false
            };
        case FETCH_CONTACT_SUCCESS:
            return {
                ...state,
                isInitial: false,
                isPending: false,
                data: data[0]
            };
        case FETCH_CONTACT_ERROR:
            return {
                ...state,
                isInitial: false,
                isPending: false,
                hasError: true
            };
        default:
            return state;
    }
}

export default contact;
