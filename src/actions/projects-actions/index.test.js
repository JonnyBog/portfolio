import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
    FETCH_PROJECTS,
    FETCH_PROJECTS_SUCCESS,
    FETCH_PROJECTS_ERROR,
    RESET_PROJECTS
} from './types';

import { requestProjects, getRequestProjectsApi, resetProjects } from '.';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Actions: projects', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    describe('requestProjects', () => {
        it('creates FETCH_PROJECTS_SUCCESS when fetching projects is a success', () => {
            fetchMock.getOnce(getRequestProjectsApi(), {
                body: { test: 'test' },
                headers: { 'content-type': 'application/json' }
            });
            const store = mockStore();

            return store.dispatch(requestProjects()).then(() => {
                expect(fetchMock._calls[0][0]).toBe(getRequestProjectsApi());
                expect(store.getActions()).toEqual([
                    { type: FETCH_PROJECTS },
                    { type: FETCH_PROJECTS_SUCCESS, data: { test: 'test' } }
                ]);
            });
        });

        it('creates FETCH_PROJECTS_SUCCESS when fetching projects is a success and there is a slug', () => {
            const slug = 'test-1';
            fetchMock.getOnce(getRequestProjectsApi(slug), {
                body: { test: 'test' },
                headers: { 'content-type': 'application/json' }
            });
            const store = mockStore();

            return store.dispatch(requestProjects(slug)).then((response) => {
                expect(fetchMock._calls[0][0]).toBe(
                    getRequestProjectsApi(slug)
                );
                expect(store.getActions()).toEqual([
                    { type: FETCH_PROJECTS },
                    { type: FETCH_PROJECTS_SUCCESS, data: { test: 'test' } }
                ]);
            });
        });

        it('creates FETCH_PROJECTS_ERROR when fetching projects is a failure', () => {
            fetchMock.getOnce(getRequestProjectsApi(), {
                headers: { 'content-type': 'application/json' }
            });
            const store = mockStore();

            return store.dispatch(requestProjects()).then(() => {
                expect(fetchMock._calls[0][0]).toBe(getRequestProjectsApi());
                expect(store.getActions()).toEqual([
                    { type: FETCH_PROJECTS },
                    { type: FETCH_PROJECTS_ERROR }
                ]);
            });
        });
    });

    it('resetProjects', () => {
        const store = mockStore();
        store.dispatch(resetProjects());

        expect(store.getActions()).toEqual([{ type: RESET_PROJECTS }]);
    });
});
