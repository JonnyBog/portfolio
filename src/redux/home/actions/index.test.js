import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { FETCH_HOME, FETCH_HOME_SUCCESS, FETCH_HOME_ERROR } from '../types';

import { requestHome, requestHomeApi } from '.';

describe('Actions: home', () => {
    describe('requestHome', () => {
        afterEach(() => {
            fetchMock.restore();
        });

        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);

        it('creates FETCH_HOME_SUCCESS when fetching home is a success', () => {
            fetchMock.getOnce(requestHomeApi, {
                body: { test: 'test' },
                headers: { 'content-type': 'application/json' }
            });
            const store = mockStore();

            return store.dispatch(requestHome()).then(() => {
                expect(fetchMock._calls[0][0]).toBe(requestHomeApi);
                expect(store.getActions()).toEqual([
                    { type: FETCH_HOME },
                    { type: FETCH_HOME_SUCCESS, data: { test: 'test' } }
                ]);
            });
        });

        it('creates FETCH_HOME_ERROR when fetching home is a failure', () => {
            fetchMock.getOnce(requestHomeApi, {
                headers: { 'content-type': 'application/json' }
            });
            const store = mockStore();

            return store.dispatch(requestHome()).then(() => {
                expect(fetchMock._calls[0][0]).toBe(requestHomeApi);
                expect(store.getActions()).toEqual([
                    { type: FETCH_HOME },
                    { type: FETCH_HOME_ERROR }
                ]);
            });
        });
    });
});
