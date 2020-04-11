import React from 'react';
import { act } from 'react-dom/test-utils';

import { routes } from '../../lib/constants';

import { setupTestProvider } from '../../setupTests';
import Header from '.';

const setupTest = setupTestProvider({
    render: () => <Header />
});

describe('Components: Header', () => {
    it('should render Header with correct className', () => {
        const { wrapper } = setupTest();
        expect(wrapper.find('header')).toHaveClassName('header');
    });

    it('should render name anchor with correct text as span', () => {
        const { wrapper } = setupTest();
        expect(wrapper.find('span[data-id="name-link"]')).toHaveText(
            'Jonny Boggon'
        );
    });

    it('should push to home when name link is clicked', () => {
        const { wrapper, history } = setupTest();
        wrapper
            .find('span[data-id="name-link"] a')
            .simulate('click', { button: 0 });
        expect(history.location.pathname).toBe('/');
    });

    it('should push to /contact when the contact link is clicked', () => {
        const { wrapper, history } = setupTest();
        act(() => {
            wrapper
                .find('span[data-id="contact-link"] a')
                .simulate('click', { button: 0 });
        });
        expect(history.location.pathname).toBe(routes.contact);
    });

    it('should render job description with correct text as p', () => {
        const { wrapper } = setupTest();
        expect(wrapper.find('p[data-id="job-description"]')).toHaveText(
            'Frontend Developer'
        );
    });

    it('should render contact with correct text as span', () => {
        const { wrapper } = setupTest();
        expect(wrapper.find('span[data-id="contact-link"] a')).toHaveText(
            'Contact'
        );
    });
});
