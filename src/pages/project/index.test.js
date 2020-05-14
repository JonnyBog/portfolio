import React from 'react';
import { act } from 'react-dom/test-utils';

import { setupTestProvider, resolvePromises } from '../../setupTests';
import { routes } from '../../lib/constants';

import {
    actions as projectsActions,
    endpoint as projectsEndpoint,
    params as projectsParams
} from '../../redux/projects';

import projectsResponse from '../../test-resources/projects-response';
import Project from '.';

const projectResponse = projectsResponse[0];
const slug = 'test';

const setupTest = setupTestProvider({
    render: () => <Project />
});

const setupTestSuccess = setupTestProvider({
    render: () => <Project />,
    stubRequests: [
        {
            endpoint: projectsEndpoint,
            params: {
                ...projectsParams,
                slug
            },
            response: projectsResponse
        }
    ],
    path: `${routes.project}/:slug`,
    initialEntries: [`${routes.project}/${slug}`]
});

describe('Pages: Project', () => {
    describe('Error', () => {
        it('renders error when project has an error', async () => {
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
                'Oops, something went wrong with loading the project.'
            );
        });

        it('renders error when project is empty and is not initial or pending', async () => {
            const { wrapper } = setupTest({
                stubRequests: [
                    {
                        endpoint: projectsEndpoint,
                        params: projectsParams,
                        response: []
                    }
                ]
            });

            await act(() => resolvePromises());
            wrapper.update();

            expect(wrapper.find('[data-qa="error-message"]')).toHaveText(
                'Oops, something went wrong with loading the project.'
            );
        });
    });

    describe('Loading', () => {
        it('should render loader initially', () => {
            jest.spyOn(
                projectsActions,
                'requestProjects'
            ).mockImplementationOnce(() => ({
                type: 'stub'
            }));
            const { wrapper } = setupTest();
            expect(wrapper.find('[data-qa="loader"]')).toExist();
        });

        it('renders loader when project is pending', () => {
            const { wrapper } = setupTest();
            expect(wrapper.find('[data-qa="loader"]')).toExist();
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
        it('renders tiles and tile', async () => {
            const { wrapper } = setupTestSuccess();

            await act(() => resolvePromises());
            wrapper.update();

            expect(wrapper.find('[data-qa="tiles"]')).toExist();
            expect(wrapper.find('[data-qa="tile"]')).toExist();
        });

        describe('Project components', () => {
            const { wrapper } = setupTestSuccess();

            it('renders the title', async () => {
                await act(() => resolvePromises());
                wrapper.update();

                expect(wrapper.find('h1[data-id="title"]')).toHaveText(
                    projectResponse.title.rendered
                );
            });

            it('renders the image', async () => {
                await act(() => resolvePromises());
                wrapper.update();

                expect(wrapper.find('img')).toHaveProp(
                    'data-src',
                    projectResponse.acf.image.sizes.medium_large
                );
                expect(wrapper.find('img')).toHaveProp(
                    'alt',
                    projectResponse.title.rendered
                );
                expect(wrapper.find('source').at(0)).toHaveProp(
                    'data-srcset',
                    projectResponse.acf.image.sizes['1536x1536']
                );
                expect(wrapper.find('source').at(0)).toHaveProp(
                    'media',
                    `(min-width: ${projectResponse.acf.image.sizes['medium_large-width']}px)`
                );
                expect(wrapper.find('source').at(1)).toHaveProp(
                    'data-srcset',
                    projectResponse.acf.image.sizes['twentytwenty-fullscreen']
                );
                expect(wrapper.find('source').at(1)).toHaveProp(
                    'media',
                    `(min-width: ${projectResponse.acf.image.sizes['1536x1536-width']}px)`
                );
            });

            it('renders the created with text', async () => {
                await act(() => resolvePromises());
                wrapper.update();

                expect(wrapper.find('[data-id="created-width"]')).toHaveText(
                    `Built at: ${projectResponse.acf.created_with}`
                );
            });

            it('renders the tools text', async () => {
                await act(() => resolvePromises());
                wrapper.update();

                expect(wrapper.find('[data-id="tools"]')).toHaveText(
                    `Tools used: ${projectResponse.acf.tools}`
                );
            });

            it('renders the link', async () => {
                await act(() => resolvePromises());
                wrapper.update();

                expect(wrapper.find('a')).toHaveProp(
                    'href',
                    projectResponse.acf.project_link.url
                );
                expect(wrapper.find('a')).toHaveText(
                    projectResponse.acf.project_link.text
                );
            });
        });

        describe('Success missing data', () => {
            it('does not render the link when there is not one', async () => {
                const { wrapper } = setupTest({
                    stubRequests: [
                        {
                            endpoint: projectsEndpoint,
                            params: projectsParams,
                            response: [
                                {
                                    ...projectResponse,
                                    acf: {
                                        ...projectResponse.acf,
                                        project_link: null
                                    }
                                }
                            ]
                        }
                    ]
                });

                await act(() => resolvePromises());
                wrapper.update();

                expect(wrapper.find('a')).not.toExist();
            });
        });
    });
});
