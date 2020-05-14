import React from 'react';
import { act } from 'react-dom/test-utils';

import { setupTestProvider, resolvePromises } from '../../setupTests';

import {
    actions as homeActions,
    endpoint as homeEndpoint,
    params as homeParams
} from '../../redux/home';
import {
    actions as projectsActions,
    endpoint as projectsEndpoint,
    params as projectsParams
} from '../../redux/projects';

import homeResponse from '../../test-resources/home-response';
import projectsResponse from '../../test-resources/projects-response';

import { routes } from '../../lib/constants';
import Home from '.';

const setupTest = setupTestProvider({
    render: () => <Home />
});

const setupTestSuccess = setupTestProvider({
    render: () => <Home />,
    stubRequests: [
        {
            endpoint: homeEndpoint,
            params: homeParams,
            response: homeResponse
        },
        {
            endpoint: projectsEndpoint,
            params: projectsParams,
            response: projectsResponse
        }
    ]
});

describe('Pages: Home', () => {
    describe('Loading', () => {
        it('should render loader initially', () => {
            const { wrapper } = setupTest();
            expect(wrapper.find('[data-qa="loader"]')).toExist();
        });

        it('renders the loader when home is initial', () => {
            jest.spyOn(homeActions, 'requestHome').mockImplementationOnce(
                () => ({
                    type: 'stub'
                })
            );

            const { wrapper } = setupTest({
                stubRequests: [
                    {
                        endpoint: projectsEndpoint,
                        params: projectsParams,
                        response: projectsResponse
                    }
                ]
            });
            expect(wrapper.find('[data-qa="loader"]')).toExist();
        });

        it('renders the loader when home is pending', () => {
            const { wrapper } = setupTest({
                stubRequests: [
                    {
                        endpoint: projectsEndpoint,
                        params: projectsParams,
                        response: projectsResponse
                    }
                ]
            });
            expect(wrapper.find('[data-qa="loader"]')).toExist();
        });

        it('renders the loader when projects is initial', () => {
            jest.spyOn(
                projectsActions,
                'requestProjects'
            ).mockImplementationOnce(() => ({
                type: 'stub'
            }));

            const { wrapper } = setupTest({
                stubRequests: [
                    {
                        endpoint: homeEndpoint,
                        params: homeParams,
                        response: homeResponse
                    }
                ]
            });
            expect(wrapper.find('[data-qa="loader"]')).toExist();
        });

        it('renders the loader when projects is pending', () => {
            const { wrapper } = setupTest({
                stubRequests: [
                    {
                        endpoint: homeEndpoint,
                        params: homeParams,
                        response: homeResponse
                    }
                ]
            });
            expect(wrapper.find('[data-qa="loader"]')).toExist();
        });
    });

    describe('Error', () => {
        it('renders error when home has an error', async () => {
            const { wrapper } = setupTest({
                stubRequests: [
                    {
                        endpoint: homeEndpoint,
                        params: homeParams,
                        status: 500
                    }
                ]
            });

            await act(() => resolvePromises());
            wrapper.update();

            expect(wrapper.find('[data-qa="error-message"]')).toHaveText(
                'Oops, something went wrong with loading the homepage.'
            );
        });

        it('renders error when projects has an error', async () => {
            const { wrapper } = setupTest({
                stubRequests: [
                    {
                        endpoint: projectsEndpoint,
                        params: projectsParams,
                        status: 500
                    }
                ]
            });

            await act(() => resolvePromises());
            wrapper.update();

            expect(wrapper.find('[data-qa="error-message"]')).toHaveText(
                'Oops, something went wrong with loading the homepage.'
            );
        });
    });

    describe('Actions', () => {
        it('should call resetProjects on unmount', () => {
            jest.spyOn(projectsActions, 'resetProjects').mockReturnValue(
                jest.fn()
            );
            const { wrapper } = setupTest();
            wrapper.unmount();

            expect(projectsActions.resetProjects).toHaveBeenCalled();
        });
    });

    describe('Success', () => {
        it('renders the description', async () => {
            const { wrapper } = setupTestSuccess();

            await act(() => resolvePromises());
            wrapper.update();

            expect(wrapper.find('[data-id="description"]')).toHaveText(
                homeResponse[0].acf.description
            );
        });

        it('renders the page header with text', async () => {
            const { wrapper } = setupTestSuccess();

            await act(() => resolvePromises());
            wrapper.update();

            expect(wrapper.find('[data-id="page-heading"]')).toHaveText(
                homeResponse[0].acf.heading
            );
        });

        describe('Projects', () => {
            it.each(projectsResponse)(
                'renders the correct components for project %#',
                async ({ acf, slug, title }) => {
                    const { wrapper } = setupTestSuccess();

                    await act(() => resolvePromises());
                    wrapper.update();

                    const project = wrapper.find(`[data-id="${slug}"]`);

                    expect(project.find('a')).toHaveProp(
                        'href',
                        `${routes.project}/${slug}`
                    );
                    expect(project.find('img')).toHaveProp(
                        'data-src',
                        acf.image.sizes.medium_large
                    );
                    expect(project.find('img')).toHaveProp(
                        'alt',
                        title.rendered
                    );
                    expect(project.find('source')).toHaveProp(
                        'data-srcset',
                        acf.image.sizes['post-thumbnail']
                    );
                    expect(project.find('source')).toHaveProp(
                        'media',
                        `(min-width: ${acf.image.sizes['medium_large-width']}px)`
                    );
                    expect(project.find('[data-qa="text"]')).toHaveText(
                        title.rendered
                    );
                }
            );
        });
    });
});
