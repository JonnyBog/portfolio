import { api } from '../../lib/constants';
import createRequest from '../helpers/create-request';
import customSelectors from './selectors';

export const endpoint = `${api}/pages`;
export const params = {
    slug: 'jonny-home',
    _fields: 'acf'
};
export const name = 'home';

const redux = createRequest({
    name,
    endpoint,
    params
});

export const { types, reducers } = redux;
export const actions = {
    requestHome: redux.actions.requestData
};
export const selectors = { ...redux.selectors, ...customSelectors };
