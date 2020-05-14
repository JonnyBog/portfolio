import React from 'react';
import { act } from 'react-dom/test-utils';

import { setupTestProvider, resolvePromises } from '../../setupTests';

import {
    actions as contactActions,
    endpoint as contactEndpoint,
    params as contactParams
} from '../../redux/contact';

import contactResponse from '../../test-resources/contact-response';

import Contact from '.';

const setupTest = setupTestProvider({
    render: () => <Contact />
});

const setupTestSuccess = setupTestProvider({
    render: () => <Contact />,
    stubRequests: [
        {
            endpoint: contactEndpoint,
            params: contactParams,
            response: contactResponse
        }
    ]
});

describe('Pages: Contact', () => {
    describe('Loading', () => {
        it('should render loader initially', () => {
            jest.spyOn(contactActions, 'requestContact').mockImplementationOnce(
                () => ({
                    type: 'stub'
                })
            );
            const { wrapper } = setupTest();
            expect(wrapper.find('[data-qa="loader"]')).toExist();
        });

        it('renders the loader when contact is pending', () => {
            const { wrapper } = setupTest();
            expect(wrapper.find('[data-qa="loader"]')).toExist();
        });
    });

    describe('Error', () => {
        it('renders error when contact has an error', async () => {
            const { wrapper } = setupTest({
                stubRequests: [
                    {
                        endpoint: contactEndpoint,
                        params: contactParams,
                        status: 500
                    }
                ]
            });

            await act(() => resolvePromises());
            wrapper.update();

            expect(wrapper.find('[data-qa="error-message"]')).toHaveText(
                'Oops, something went wrong with loading the contact page.'
            );
        });
    });

    describe('Success', () => {
        const { wrapper } = setupTestSuccess();

        it('renders the description', async () => {
            await act(() => resolvePromises());
            wrapper.update();

            expect(wrapper.find('[data-id="description"]')).toHaveText(
                contactResponse[0].acf.description
            );
        });

        it('renders the contact number', async () => {
            await act(() => resolvePromises());
            wrapper.update();

            expect(wrapper.find('[data-id="number"] a')).toHaveProp(
                'href',
                `tel:${contactResponse[0].acf.number}`
            );
            expect(wrapper.find('[data-id="number"] a')).toHaveText(
                contactResponse[0].acf.number
            );
        });

        it('renders the contact email', async () => {
            await act(() => resolvePromises());
            wrapper.update();

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
