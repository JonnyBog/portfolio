import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import moxios from 'moxios';
import { createStore, compose, applyMiddleware } from 'redux';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import 'jest-enzyme';

import rootReducer from './redux/reducers';

configure({ adapter: new Adapter() });

export const resolvePromises = (size = 10) =>
    Promise.all(
        Array.from(Array(size).keys()).map(() =>
            process.nextTick(() => Promise.resolve())
        )
    );

export const setupTestComponent = ({
    render: baseRender,
    props: baseProps
} = {}) => ({ render: testRender, props: testProps } = {}) => {
    const render = testRender || baseRender;
    const props = testProps || baseProps;
    return {
        wrapper: mount(
            <MemoryRouter>{React.cloneElement(render(), props)}</MemoryRouter>
        )
    };
};

const buildParams = (params) =>
    params
        ? Object.entries(params)
              .reduce((acc, [key, value]) => `${acc}${key}=${value}&`, '?')
              .slice(0, -1)
        : '';

afterEach(() => moxios.uninstall());

export const setupTestProvider = ({
    render: baseRender,
    prerender: basePrerender = () => {},
    path: basePath,
    initialEntries: baseInitialEntries,
    props: baseProps,
    stubRequests: baseStubRequests = []
} = {}) => ({
    render: testRender,
    props: testProps,
    prerender: testPrerender = () => {},
    path: testPath,
    initialEntries: testInitialEntries,
    stubRequests: testStubRequests = []
} = {}) => {
    const render = testRender || baseRender;
    const props = testProps || baseProps;
    const store = createStore(rootReducer, {}, compose(applyMiddleware(thunk)));
    let history;
    basePrerender(store);
    testPrerender(store);
    const path = testPath || basePath || '*';
    const initialEntries = testInitialEntries || baseInitialEntries || ['/'];

    moxios.install();
    const stubRequests = [...baseStubRequests, ...testStubRequests];
    stubRequests.forEach(
        ({ endpoint: initialEndpoint, params, status = 200, response }) => {
            const endpoint = `${initialEndpoint}${buildParams(params)}`;
            moxios.stubRequest(endpoint, {
                status,
                responseText: response
            });
        }
    );

    return {
        wrapper: mount(
            <MemoryRouter initialEntries={initialEntries}>
                <Provider store={store}>
                    <Route
                        path={path}
                        render={({ history: _history }) => {
                            history = _history;
                            return React.cloneElement(render(), props);
                        }}
                    />
                </Provider>
            </MemoryRouter>
        ),
        store,
        history
    };
};
