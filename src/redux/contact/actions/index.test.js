import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
    FETCH_CONTACT,
    FETCH_CONTACT_SUCCESS,
    FETCH_CONTACT_ERROR
} from '../types';
import { requestContact, requestContactApi } from '.';

describe('Actions: contact', () => {
    describe('requestContact', () => {
        afterEach(() => {
            fetchMock.restore();
        });

        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);

        it('creates FETCH_CONTACT_SUCCESS when fetching contact is a success', () => {
            fetchMock.getOnce(requestContactApi, {
                body: { test: 'test' },
                headers: { 'content-type': 'application/json' }
            });
            const store = mockStore();

            return store.dispatch(requestContact()).then(() => {
                expect(fetchMock._calls[0][0]).toBe(requestContactApi);
                expect(store.getActions()).toEqual([
                    { type: FETCH_CONTACT },
                    { type: FETCH_CONTACT_SUCCESS, data: { test: 'test' } }
                ]);
            });
        });

        it('creates FETCH_CONTACT_ERROR when fetching contact is a failure', () => {
            fetchMock.getOnce(requestContactApi, {
                headers: { 'content-type': 'application/json' }
            });
            const store = mockStore();

            return store.dispatch(requestContact()).then(() => {
                expect(fetchMock._calls[0][0]).toBe(requestContactApi);
                expect(store.getActions()).toEqual([
                    { type: FETCH_CONTACT },
                    { type: FETCH_CONTACT_ERROR }
                ]);
            });
        });
    });
});
