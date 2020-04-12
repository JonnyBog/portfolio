import { HashRouter, Route } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import thunk from 'redux-thunk';

import Header from '../components/header';
import Contact from '../pages/contact';
import Home from '../pages/home';
import Project from '../pages/project';

import { routes } from '../lib/constants';
import rootReducer from '../redux/reducers';

import styles from './index.module.css';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default () => (
    <Provider store={store}>
        <HashRouter>
            <div className={styles.container}>
                <Header />
                <Route path={routes.home} exact component={Home} />
                <Route path={`${routes.project}/:slug`} component={Project} />
                <Route path={routes.contact} exact component={Contact} />
            </div>
        </HashRouter>
    </Provider>
);
