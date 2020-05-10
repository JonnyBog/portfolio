import { api } from '../../lib/constants';
import createRequest from '../helpers/create-request';
import customSelectors from './selectors';

const endpoint = `${api}/pages?slug=jonny-home&_fields=acf`;
export const name = 'home';

const redux = createRequest({
    name,
    endpoint
});

export const { types, reducers } = redux;
export const actions = {
    requestHome: redux.actions.requestData
};
export const selectors = { ...redux.selectors, ...customSelectors };
