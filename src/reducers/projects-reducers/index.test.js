import projectsReducer, { initialState } from '.';
import {
  FETCH_PROJECTS,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_ERROR
} from '../../actions/projects-actions/types';

describe('Reducers: Projects', () => {
  it('should return the initial state', () => {
    expect(projectsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_PROJECTS', () => {
    expect(
      projectsReducer(undefined, {
        type: FETCH_PROJECTS
      })
    ).toEqual({
      ...initialState,
      isPending: true,
      isInitial: false
    });
  });

  it('should handle FETCH_PROJECTS_SUCCESS', () => {
    expect(
      projectsReducer(undefined, {
        type: FETCH_PROJECTS_SUCCESS,
        data: 'test'
      })
    ).toEqual({
      ...initialState,
      isInitial: false,
      isPending: false,
      data: 'test'
    });
  });

  it('should handle FETCH_PROJECTS_ERROR', () => {
    expect(
      projectsReducer(undefined, {
        type: FETCH_PROJECTS_ERROR
      })
    ).toEqual({
      ...initialState,
      isInitial: false,
      isPending: false,
      hasError: true
    });
  });
});
