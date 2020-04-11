import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import home from './home-reducers';
import projects from './projects-reducers';
import contact from './contact-reducers';

const rootReducer = combineReducers({
    projects,
    home,
    contact,
    routing: routerReducer
});

export default rootReducer;
