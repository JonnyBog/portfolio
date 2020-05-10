import React from 'react';

import { setupTestProvider } from '../../setupTests';

import { actions as homeActions, types as homeTypes } from '../../redux/home';
import {
    actions as projectsActions,
    types as projectsTypes
} from '../../redux/projects';

import homeResponse from '../../test-resources/home-response';
import projectsResponse from '../../test-resources/projects-response';

import { routes } from '../../lib/constants';
import Home from '.';

jest.spyOn(homeActions, 'requestHome').mockReturnValue(jest.fn());
jest.spyOn(projectsActions, 'requestProjects').mockReturnValue(jest.fn());
jest.spyOn(projectsActions, 'resetProjects').mockReturnValue(jest.fn());

const {
    pending: homePending,
    success: homeSuccess,
    error: homeError
} = homeTypes;
const {
    pending: projectsPending,
    success: projectsSuccess,
    error: projectsError
} = projectsTypes;

const setupTest = setupTestProvider({
    render: () => <Home />
});

const setupTestSuccess = setupTestProvider({
    render: () => <Home />,
    prerender: ({ dispatch }) => {
        dispatch({
            type: homeSuccess,
            data: homeResponse
        });
        dispatch({
            type: projectsSuccess,
            data: projectsResponse
        });
    }
});

describe('Pages: Home', () => {
    describe('Loading', () => {
        it('should render loader initially', () => {
            const { wrapper } = setupTest();
            expect(wrapper.find('[data-qa="loader"]')).toExist();
        });

        it('renders the loader when home is initial', () => {
            const { wrapper } = setupTest({
                prerender: ({ dispatch }) => {
                    dispatch({
                        type: projectsSuccess,
                        data: []
                    });
                }
            });
            expect(wrapper.find('[data-qa="loader"]')).toExist();
        });

        it('renders the loader when home is pending', () => {
            const { wrapper } = setupTest({
                prerender: ({ dispatch }) => {
                    dispatch({
                        type: homePending
                    });
                    dispatch({
                        type: projectsSuccess,
                        data: []
                    });
                }
            });
            expect(wrapper.find('[data-qa="loader"]')).toExist();
        });

        it('renders the loader when projects is initial', () => {
            const { wrapper } = setupTest({
                prerender: ({ dispatch }) => {
                    dispatch({
                        type: homeSuccess,
                        data: []
                    });
                }
            });
            expect(wrapper.find('[data-qa="loader"]')).toExist();
        });

        it('renders the loader when projects is pending', () => {
            const { wrapper } = setupTest({
                prerender: ({ dispatch }) => {
                    dispatch({
                        type: homeSuccess,
                        data: []
                    });
                    dispatch({
                        type: projectsPending
                    });
                }
            });
            expect(wrapper.find('[data-qa="loader"]')).toExist();
        });
    });

    describe('Error', () => {
        it('renders error when home has an error', () => {
            const { wrapper } = setupTest({
                prerender: ({ dispatch }) => {
                    dispatch({
                        type: homeError
                    });
                }
            });
            expect(wrapper.find('[data-qa="error-message"]')).toHaveText(
                'Oops, something went wrong with loading the homepage.'
            );
        });

        it('renders error when projects has an error', () => {
            const { wrapper } = setupTest({
                prerender: ({ dispatch }) => {
                    dispatch({
                        type: projectsError
                    });
                }
            });
            expect(wrapper.find('[data-qa="error-message"]')).toHaveText(
                'Oops, something went wrong with loading the homepage.'
            );
        });
    });

    describe('Actions', () => {
        it('should call requestHome on mount', () => {
            setupTest();
            expect(homeActions.requestHome).toHaveBeenCalled();
        });

        it('should call requestProjects on mount', () => {
            setupTest();
            expect(projectsActions.requestProjects).toHaveBeenCalled();
        });

        it('should call resetProjects on unmount', () => {
            const { wrapper } = setupTest();
            wrapper.unmount();

            expect(projectsActions.resetProjects).toHaveBeenCalled();
        });
    });

    describe('Success', () => {
        it('renders the description', () => {
            const { wrapper } = setupTestSuccess();
            expect(wrapper.find('[data-id="description"]')).toHaveText(
                homeResponse[0].acf.description
            );
        });

        it('renders the page header with text', () => {
            const { wrapper } = setupTestSuccess();
            expect(wrapper.find('[data-id="page-heading"]')).toHaveText(
                homeResponse[0].acf.heading
            );
        });

        describe('Projects', () => {
            it.each(projectsResponse)(
                'renders the correct components for project %#',
                ({ acf, slug, title }) => {
                    const { wrapper } = setupTestSuccess();
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
