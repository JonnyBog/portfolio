import React from 'react';

import { setupTestProvider } from '../../setupTests';

import {
    actions as projectsActions,
    types as projectsTypes
} from '../../redux/projects';

import projectsResponse from '../../test-resources/projects-response';
import { routes } from '../../lib/constants';
import Project from '.';

jest.spyOn(projectsActions, 'requestProjects').mockReturnValue(jest.fn());
jest.spyOn(projectsActions, 'resetProjects').mockReturnValue(jest.fn());

const {
    pending: projectsPending,
    success: projectsSuccess,
    error: projectsError
} = projectsTypes;

const projectResponse = projectsResponse[0];

const setupTest = setupTestProvider({
    render: () => <Project />
});

const setupTestSuccess = setupTestProvider({
    render: () => <Project />,
    prerender: ({ dispatch }) => {
        dispatch({
            type: projectsSuccess,
            data: projectsResponse
        });
    }
});

describe('Pages: Project', () => {
    describe('Error', () => {
        it('renders error when project has an error', () => {
            const { wrapper } = setupTest({
                prerender: ({ dispatch }) => {
                    dispatch({
                        type: projectsError
                    });
                }
            });
            expect(wrapper.find('[data-qa="error-message"]')).toHaveText(
                'Oops, something went wrong with loading the project.'
            );
        });

        it('renders error when project is empty and is not initial or pending', () => {
            const { wrapper } = setupTest({
                prerender: ({ dispatch }) => {
                    dispatch({
                        type: projectsSuccess,
                        data: []
                    });
                }
            });
            expect(wrapper.find('[data-qa="error-message"]')).toHaveText(
                'Oops, something went wrong with loading the project.'
            );
        });
    });

    describe('Loading', () => {
        it('should render loader when project is initial', () => {
            const { wrapper } = setupTest();
            expect(wrapper.find('[data-qa="loader"]')).toExist();
        });

        it('renders loader when project is pending', () => {
            const { wrapper } = setupTest({
                prerender: ({ dispatch }) => {
                    dispatch({
                        type: projectsPending
                    });
                }
            });
            expect(wrapper.find('[data-qa="loader"]')).toExist();
        });
    });

    describe('Actions', () => {
        it('should call requestProjects with the slug from the url on mount', () => {
            const slug = 'test';
            setupTest({
                path: `${routes.project}/:slug`,
                initialEntries: [`${routes.project}/${slug}`]
            });
            expect(projectsActions.requestProjects).toHaveBeenCalledWith({
                params: { slug }
            });
        });

        it('should call resetProjects on unmount', () => {
            const { wrapper } = setupTest();
            wrapper.unmount();

            expect(projectsActions.resetProjects).toHaveBeenCalled();
        });
    });

    describe('Success', () => {
        it('renders tiles and tile', () => {
            const { wrapper } = setupTestSuccess();
            expect(wrapper.find('[data-qa="tiles"]')).toExist();
            expect(wrapper.find('[data-qa="tile"]')).toExist();
        });

        describe('Project components', () => {
            const { wrapper } = setupTestSuccess();

            it('renders the title', () => {
                expect(wrapper.find('h1[data-id="title"]')).toHaveText(
                    projectResponse.title.rendered
                );
            });

            it('renders the image', () => {
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

            it('renders the created with text', () => {
                expect(wrapper.find('[data-id="created-width"]')).toHaveText(
                    `Built at: ${projectResponse.acf.created_with}`
                );
            });

            it('renders the tools text', () => {
                expect(wrapper.find('[data-id="tools"]')).toHaveText(
                    `Tools used: ${projectResponse.acf.tools}`
                );
            });

            it('renders the link', () => {
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
            it('does not render the link when there is not one', () => {
                const { wrapper } = setupTest({
                    prerender: ({ dispatch }) => {
                        dispatch({
                            type: projectsSuccess,
                            data: [
                                {
                                    ...projectResponse,
                                    acf: {
                                        ...projectResponse.acf,
                                        project_link: null
                                    }
                                }
                            ]
                        });
                    }
                });
                expect(wrapper.find('a')).not.toExist();
            });
        });
    });
});
