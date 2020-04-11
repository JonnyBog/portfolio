import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import { createStore, compose, applyMiddleware } from 'redux';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import 'jest-enzyme';

import rootReducer from './reducers';

configure({ adapter: new Adapter() });

export const setupTestComponent = ({ render } = {}) => ({ props } = {}) => ({
    wrapper: mount(
        <MemoryRouter>{React.cloneElement(render(), props)}</MemoryRouter>
    )
});

export const setupTestProvider = ({
    render,
    prerender: basePrerender = () => {},
    path: basePath,
    initialEntries: baseInitialEntries
} = {}) => ({
    props,
    prerender: testPrerender = () => {},
    path: testPath,
    initialEntries: testInitialEntries
} = {}) => {
    const store = createStore(rootReducer, {}, compose(applyMiddleware(thunk)));
    let history;
    basePrerender(store);
    testPrerender(store);
    const path = testPath || basePath || '*';
    const initialEntries = testInitialEntries || baseInitialEntries || ['/'];

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
