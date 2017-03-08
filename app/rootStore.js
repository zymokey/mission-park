import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import common from '../features/common/reducers';
import auth from '../features/userSign/reducers';
import project from '../features/project/reducers';
import taskboard from '../features/taskboard/reducers';

const rootReducer = combineReducers({common, auth, project, taskboard});

let rootStore = createStore(rootReducer, applyMiddleware(thunk));

export default rootStore;