import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import createTypes from '../types';
import createActions from '.';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Actions: create request', () => {
    const name = 'test';
    const endpoint = 'http://www.test.com/test';
    const data = [{ test: 'test' }];
    const types = createTypes(name);
    const { pending, success, error, reset } = types;

    describe('requestData', () => {
        beforeEach(() => {
            moxios.install();
        });
        afterEach(() => {
            moxios.uninstall();
        });

        it('creates success when fetching data is a success', (done) => {
            const { requestData } = createActions({
                types,
                endpoint
            });
            moxios.stubRequest(endpoint, {
                status: 200,
                responseText: data
            });

            const store = mockStore();

            return store.dispatch(requestData()).then(() => {
                expect(store.getActions()[0].type).toEqual(pending);
                expect(store.getActions()[1].type).toEqual(success);
                expect(store.getActions()[1].data).toEqual(data);
                done();
            });
        });

        it('creates success when fetching data is a success and there is static params', (done) => {
            const params = {
                slug: 'test'
            };
            const { requestData } = createActions({
                types,
                endpoint,
                params
            });
            moxios.stubRequest(`${endpoint}?slug=test`, {
                status: 200,
                responseText: data
            });

            const store = mockStore();

            return store.dispatch(requestData()).then(() => {
                expect(store.getActions()[0].type).toEqual(pending);
                expect(store.getActions()[1].type).toEqual(success);
                expect(store.getActions()[1].data).toEqual(data);
                done();
            });
        });

        it('creates success when fetching data is a success and there is dynamic params', (done) => {
            const params = {
                slug: 'test'
            };
            const { requestData } = createActions({
                types,
                endpoint
            });
            moxios.stubRequest(`${endpoint}?slug=test`, {
                status: 200,
                responseText: data
            });

            const store = mockStore();

            return store.dispatch(requestData({ params })).then(() => {
                expect(store.getActions()[0].type).toEqual(pending);
                expect(store.getActions()[1].type).toEqual(success);
                expect(store.getActions()[1].data).toEqual(data);
                done();
            });
        });

        it('creates error when fetching data is a failure', (done) => {
            const { requestData } = createActions({
                types,
                endpoint
            });
            moxios.stubRequest(endpoint, {
                status: 500
            });

            const store = mockStore();

            return store.dispatch(requestData()).then(() => {
                expect(store.getActions()[0].type).toEqual(pending);
                expect(store.getActions()[1].type).toEqual(error);
                done();
            });
        });
    });

    it('requestReset', () => {
        const { requestReset } = createActions({
            types,
            endpoint
        });

        const store = mockStore();
        store.dispatch(requestReset());

        expect(store.getActions()).toEqual([{ type: reset }]);
    });
});
