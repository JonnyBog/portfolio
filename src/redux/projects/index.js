import { api } from '../../lib/constants';
import createRequest from '../helpers/create-request';
import customSelectors from './selectors';

export const endpoint = `${api}/jonny_project`;
export const params = {
    _fields: 'title,acf,slug'
};

export const name = 'projects';

const redux = createRequest({
    name,
    endpoint,
    params
});

export const { types, reducers } = redux;
export const actions = {
    requestProjects: redux.actions.requestData,
    resetProjects: redux.actions.requestReset
};
export const selectors = { ...redux.selectors, ...customSelectors };
