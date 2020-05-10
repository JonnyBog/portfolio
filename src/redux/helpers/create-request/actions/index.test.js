import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import createTypes from '../types';
import createActions from '.';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Actions: create request', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    const name = 'test';
    const endpoint = 'http://www.test.com/test';
    const types = createTypes(name);
    const { pending, success, error, reset } = types;
    const { requestData, requestReset } = createActions({ types, endpoint });

    describe('requestData', () => {
        it('creates success when fetching data is a success', () => {
            fetchMock.getOnce(endpoint, {
                body: { test: 'test' },
                headers: { 'content-type': 'application/json' }
            });
            const store = mockStore();

            return store.dispatch(requestData()).then(() => {
                expect(fetchMock._calls[0][0]).toBe(endpoint);
                expect(store.getActions()).toEqual([
                    { type: pending },
                    { type: success, data: { test: 'test' } }
                ]);
            });
        });

        it('creates success when fetching data is a success and there is a slug', () => {
            const slug = 'test-1';
            const endpointWithSlug = `${endpoint}&slug=${slug}`;
            fetchMock.getOnce(endpointWithSlug, {
                body: { test: 'test' },
                headers: { 'content-type': 'application/json' }
            });
            const store = mockStore();

            return store.dispatch(requestData(slug)).then(() => {
                expect(fetchMock._calls[0][0]).toBe(endpointWithSlug);
                expect(store.getActions()).toEqual([
                    { type: pending },
                    { type: success, data: { test: 'test' } }
                ]);
            });
        });

        it('creates error when fetching data is a failure', () => {
            fetchMock.getOnce(endpoint, {
                headers: { 'content-type': 'application/json' }
            });
            const store = mockStore();

            return store.dispatch(requestData()).then(() => {
                expect(fetchMock._calls[0][0]).toBe(endpoint);
                expect(store.getActions()).toEqual([
                    { type: pending },
                    { type: error }
                ]);
            });
        });
    });

    it('requestReset', () => {
        const store = mockStore();
        store.dispatch(requestReset());

        expect(store.getActions()).toEqual([{ type: reset }]);
    });
});
