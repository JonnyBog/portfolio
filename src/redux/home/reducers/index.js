import { FETCH_HOME, FETCH_HOME_SUCCESS, FETCH_HOME_ERROR } from '../types';

export const initialState = {
    isInitial: true,
    isPending: false,
    data: [],
    hasError: false
};

function home(state = initialState, { type, data }) {
    switch (type) {
        case FETCH_HOME:
            return {
                ...state,
                isPending: true,
                isInitial: false
            };
        case FETCH_HOME_SUCCESS:
            return {
                ...state,
                isInitial: false,
                isPending: false,
                data: data[0]
            };
        case FETCH_HOME_ERROR:
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

export default home;
