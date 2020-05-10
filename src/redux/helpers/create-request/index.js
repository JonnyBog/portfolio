import createActions from './actions';
import createTypes from './types';
import createReducers from './reducers';
import createSelectors from './selectors';

export default function createRequest({ name, endpoint } = {}) {
    if (!name || !endpoint) {
        return {};
    }

    const types = createTypes(name);
    const actions = createActions({ types, endpoint });
    const reducers = createReducers(types);
    const selectors = createSelectors(name);

    return {
        types,
        actions,
        reducers,
        selectors
    };
}
