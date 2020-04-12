import React from 'react';

import { setupTestProvider } from '../../setupTests';
import * as contactActions from '../../redux/contact/actions';

import {
    FETCH_CONTACT,
    FETCH_CONTACT_SUCCESS,
    FETCH_CONTACT_ERROR
} from '../../redux/contact/types';

import contactResponse from '../../test-resources/contact-response';

import Contact from '.';

jest.spyOn(contactActions, 'requestContact').mockReturnValue(jest.fn());

const setupTest = setupTestProvider({
    render: () => <Contact />
});

const setupTestSuccess = setupTestProvider({
    render: () => <Contact />,
    prerender: ({ dispatch }) => {
        dispatch({
            type: FETCH_CONTACT_SUCCESS,
            data: contactResponse
        });
    }
});

describe('Pages: Contact', () => {
    describe('Loading', () => {
        it('should render loader initially', () => {
            const { wrapper } = setupTest();
            expect(wrapper.find('[data-qa="loader"]')).toExist();
        });

        it('renders the loader when contact is pending', () => {
            const { wrapper } = setupTest({
                type: FETCH_CONTACT
            });
            expect(wrapper.find('[data-qa="loader"]')).toExist();
        });
    });

    describe('Error', () => {
        it('renders error when contact has an error', () => {
            const { wrapper } = setupTest({
                prerender: ({ dispatch }) => {
                    dispatch({
                        type: FETCH_CONTACT_ERROR
                    });
                }
            });
            expect(wrapper.find('[data-qa="error-message"]')).toHaveText(
                'Oops, something went wrong with loading the contact page.'
            );
        });
    });

    describe('Actions', () => {
        it('should call requestContact on mount', () => {
            setupTest();
            expect(contactActions.requestContact).toHaveBeenCalled();
        });
    });

    describe('Success', () => {
        const { wrapper } = setupTestSuccess();

        it('renders the description', () => {
            expect(wrapper.find('[data-id="description"]')).toHaveText(
                contactResponse[0].acf.description
            );
        });

        it('renders the contact number', () => {
            expect(wrapper.find('[data-id="number"] a')).toHaveProp(
                'href',
                `tel:${contactResponse[0].acf.number}`
            );
            expect(wrapper.find('[data-id="number"] a')).toHaveText(
                contactResponse[0].acf.number
            );
        });

        it('renders the contact email', () => {
            expect(wrapper.find('[data-id="email"] a')).toHaveProp(
                'href',
                'mailto:' + contactResponse[0].acf.email
            );
            expect(wrapper.find('[data-id="email"] a')).toHaveText(
                contactResponse[0].acf.email
            );
        });
    });
});
