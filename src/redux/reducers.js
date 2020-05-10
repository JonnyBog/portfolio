import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducers as homeReducers, name as home } from './home';
import { reducers as projectsReducers, name as projects } from './projects';
import { reducers as contactReducers, name as contact } from './contact';

const rootReducer = combineReducers({
    [projects]: projectsReducers,
    [home]: homeReducers,
    [contact]: contactReducers,
    routing: routerReducer
});

export default rootReducer;
