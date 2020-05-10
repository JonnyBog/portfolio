import { api } from '../../lib/constants';
import createRequest from '../helpers/create-request';
import customSelectors from './selectors';

const endpoint = `${api}/pages?slug=jonny-contact&_fields=acf`;
export const name = 'contact';

const redux = createRequest({
    name,
    endpoint
});

export const { types, reducers } = redux;
export const actions = { requestContact: redux.actions.requestData };
export const selectors = { ...redux.selectors, ...customSelectors };
