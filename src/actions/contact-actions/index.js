import { api, prependRequest } from '../../lib/constants';

import {
    FETCH_CONTACT,
    FETCH_CONTACT_SUCCESS,
    FETCH_CONTACT_ERROR
} from './types';

function fetchContact() {
    return {
        type: FETCH_CONTACT
    };
}

function fetchContactSuccess(data) {
    return {
        type: FETCH_CONTACT_SUCCESS,
        data
    };
}

function fetchContactError() {
    return {
        type: FETCH_CONTACT_ERROR
    };
}

export const requestContactApi = `${prependRequest}${api}/pages?slug=contact&_fields=acf`;

export function requestContact() {
    return (dispatch) => {
        dispatch(fetchContact());
        return fetch(requestContactApi)
            .then((response) => response.json())
            .then(
                (data) => dispatch(fetchContactSuccess(data)),
                () => dispatch(fetchContactError())
            );
    };
}
