import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';

import { setupTestComponent } from '../setupTests';
import { routes } from '../lib/constants';
import Header from '../components/header';
import Contact from '../pages/contact';
import Home from '../pages/home';
import Project from '../pages/project';
import App from '.';

const setupTest = setupTestComponent({
    render: () => <App />
});

describe('App', () => {
    it('renders the app', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });

    it('renders a provider', () => {
        const { wrapper } = setupTest();
        expect(wrapper.find(Provider)).toExist();
    });

    it('renders HashRouter', () => {
        const { wrapper } = setupTest();
        expect(wrapper.find(HashRouter)).toExist();
    });

    it('renders Header component', () => {
        const { wrapper } = setupTest();
        expect(wrapper.find(Header)).toExist();
    });

    it('renders route for home', () => {
        const { wrapper } = setupTest();
        expect(wrapper.find(Route).at(0)).toHaveProp('path', routes.home);
        expect(wrapper.find(Route).at(0)).toHaveProp('component', Home);
    });

    it('renders route for project', () => {
        const { wrapper } = setupTest();
        expect(wrapper.find(Route).at(1)).toHaveProp(
            'path',
            `${routes.project}/:slug`
        );
        expect(wrapper.find(Route).at(1)).toHaveProp('component', Project);
    });

    it('renders route for contact', () => {
        const { wrapper } = setupTest();
        expect(wrapper.find(Route).at(2)).toHaveProp('path', routes.contact);
        expect(wrapper.find(Route).at(2)).toHaveProp('component', Contact);
    });
});
