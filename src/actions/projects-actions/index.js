import { api, prependRequest } from '../../lib/constants';
import {
    FETCH_PROJECTS,
    FETCH_PROJECTS_SUCCESS,
    FETCH_PROJECTS_ERROR,
    RESET_PROJECTS
} from './types';

function fetchProjects() {
    return {
        type: FETCH_PROJECTS
    };
}

function fetchProjectsSuccess(data) {
    return {
        type: FETCH_PROJECTS_SUCCESS,
        data
    };
}

function fetchProjectsError() {
    return {
        type: FETCH_PROJECTS_ERROR
    };
}

export function resetProjects() {
    return {
        type: RESET_PROJECTS
    };
}

const requestProjectsApi = `${prependRequest}${api}/project?_fields=title,acf,slug`;

export const getRequestProjectsApi = (slug) =>
    slug ? `${requestProjectsApi}&slug=${slug}` : requestProjectsApi;

export function requestProjects(slug) {
    return (dispatch) => {
        dispatch(fetchProjects());
        return fetch(getRequestProjectsApi(slug))
            .then((response) => response.json())
            .then(
                (data) => dispatch(fetchProjectsSuccess(data)),
                () => dispatch(fetchProjectsError())
            );
    };
}
