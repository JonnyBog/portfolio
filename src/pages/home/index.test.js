import React from 'react';

import { setupTestProvider } from '../../setupTests';
import * as homeActions from '../../actions/home-actions';
import * as projectsActions from '../../actions/projects-actions';
import {
    FETCH_HOME,
    FETCH_HOME_SUCCESS,
    FETCH_HOME_ERROR
} from '../../actions/home-actions/types';
import {
    FETCH_PROJECTS,
    FETCH_PROJECTS_SUCCESS,
    FETCH_PROJECTS_ERROR
} from '../../actions/projects-actions/types';
import homeResponse from '../../test-resources/home-response';
import projectsResponse from '../../test-resources/projects-response';
import { routes } from '../../lib/constants';
import Home from '.';

jest.spyOn(homeActions, 'requestHome').mockReturnValue(jest.fn());
jest.spyOn(projectsActions, 'requestProjects').mockReturnValue(jest.fn());

const setupTest = setupTestProvider({
    render: () => <Home />
});

const setupTestSuccess = setupTestProvider({
    render: () => <Home />,
    prerender: ({ dispatch }) => {
        dispatch({
            type: FETCH_HOME_SUCCESS,
            data: homeResponse
        });
        dispatch({
            type: FETCH_PROJECTS_SUCCESS,
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
                        type: FETCH_PROJECTS_SUCCESS,
                        data: projectsResponse
                    });
                }
            });
            expect(wrapper.find('[data-qa="loader"]')).toExist();
        });

        it('renders the loader when home is pending', () => {
            const { wrapper } = setupTest({
                prerender: ({ dispatch }) => {
                    dispatch({
                        type: FETCH_HOME
                    });
                    dispatch({
                        type: FETCH_PROJECTS_SUCCESS,
                        data: projectsResponse
                    });
                }
            });
            expect(wrapper.find('[data-qa="loader"]')).toExist();
        });

        it('renders the loader when projects is pending', () => {
            const { wrapper } = setupTest({
                prerender: ({ dispatch }) => {
                    dispatch({
                        type: FETCH_HOME
                    });
                    dispatch({
                        type: FETCH_PROJECTS,
                        data: projectsResponse
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
                        type: FETCH_HOME_ERROR
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
                        type: FETCH_PROJECTS_ERROR
                    });
                }
            });
            expect(wrapper.find('[data-qa="error-message"]')).toHaveText(
                'Oops, something went wrong with loading the homepage.'
            );
        });
    });

    describe('Actions', () => {
        it('should call requestHome', () => {
            setupTest();
            expect(homeActions.requestHome).toHaveBeenCalled();
        });

        it('should call requestProjects', () => {
            setupTest();
            expect(projectsActions.requestProjects).toHaveBeenCalled();
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
