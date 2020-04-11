import homeReducer, { initialState } from '.';
import {
  FETCH_HOME,
  FETCH_HOME_SUCCESS,
  FETCH_HOME_ERROR
} from '../../actions/home-actions/types';

describe('Reducers: Home', () => {
  it('should return the initial state', () => {
    expect(homeReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_HOME', () => {
    expect(
      homeReducer(undefined, {
        type: FETCH_HOME
      })
    ).toEqual({
      ...initialState,
      isInitial: false,
      isPending: true
    });
  });

  it('should handle FETCH_HOME_SUCCESS', () => {
    expect(
      homeReducer(undefined, {
        type: FETCH_HOME_SUCCESS,
        data: ['test']
      })
    ).toEqual({
      ...initialState,
      isInitial: false,
      isPending: false,
      data: 'test'
    });
  });

  it('should handle FETCH_HOME_ERROR', () => {
    expect(
      homeReducer(undefined, {
        type: FETCH_HOME_ERROR
      })
    ).toEqual({
      ...initialState,
      isInitial: false,
      isPending: false,
      hasError: true
    });
  });
});
