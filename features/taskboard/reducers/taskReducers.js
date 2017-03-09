import { 
	ADD_TASK_REQUEST, ADD_TASK_SUCCESS, ADD_TASK_FAILURE, 
	FETCH_TASK_REQUEST, FETCH_TASK_SUCCESS, FETCH_TASK_FAILURE, 
	SET_CURRENT_TASKLIST, 
	NULL_TASKLIST_ID,
	OPEN_USERS_DROPDOWN, CLOSE_USERS_DROPDOWN,  
	ADD_EXECUTOR, REMOVE_EXECUTOR, REMOVE_ALL_EXECUTOR  
} from '../actions/taskActions';
import { SET_CURRENT_TASKLIST_ID_TO_NULL } from '../actions/tasklistActions';

import { addNewObjectToArrayBegin, addNewObjectToArrayEnd, removeSpecificObjectFromArray } from '../../../utils';

const initialState = {
	taskLoading: false,
	tasks: [],
	newTask: null,
	taskError: false,
	taskInfoText: '',
	currentTasklistId: null,
	activeTasklist: 0,
	currentTasklistName: '',

	// users dropdown state
	showUsersDropdown: false,
	executors: [],
}

export default function task(state = initialState, action){
	switch(action.type){
		case ADD_TASK_REQUEST:
			return Object.assign({}, state, {
				taskLoading: true,
				taskInfoText: 'adding task...'
			});
		case ADD_TASK_SUCCESS:
			return Object.assign({}, state, {
				taskLoading: false,
				newTask: action.payload,
				tasks: addNewObjectToArrayBegin(state.tasks, action.payload),
				taskInfoText: ''
			});
		case ADD_TASK_FAILURE:
			return Object.assign({}, state, {
				taskLoading: false,
				taskError: true,
				newTask: null,
				taskInfoText: 'Error:' + action.payload.errors
			});

		case FETCH_TASK_REQUEST:
			return Object.assign({}, state, {
				taskLoading: true,
				taskInfoText: 'fetching task ...'
			});
		case FETCH_TASK_SUCCESS:
			return Object.assign({}, state, {
				taskLoading: false,
				tasks: action.payload,
				taskInfoText: ''
			});
		case FETCH_TASK_FAILURE:
			return Object.assign({}, state, {
				taskLoading: false,
				taskError: true,
				tasks: [],
				taskInfoText: 'Error:' + action.payload.errors
			});
		case SET_CURRENT_TASKLIST:
			return Object.assign({}, state, {
				currentTasklistId: action.payload.tasklistId,
				activeTasklist: action.payload.index,
				currentTasklistName: action.payload.tasklistName
			});
		case NULL_TASKLIST_ID:
			return Object.assign({}, state, {
				tasks: []
			});
		case SET_CURRENT_TASKLIST_ID_TO_NULL:
			return Object.assign({}, state, {
				currentTasklistId: null
			});

		// users dropdown reducer
		case OPEN_USERS_DROPDOWN:
			return Object.assign({}, state, {
				showUsersDropdown: true
			});
		
		case CLOSE_USERS_DROPDOWN:
			return Object.assign({}, state, {
				showUsersDropdown: false
			});
		case ADD_EXECUTOR: 
			return Object.assign({}, state, {
				executors: addNewObjectToArrayEnd(state.executors, action.payload)	// The concat method creates a new array instead of mutating the original array itself!!!
			});
		case REMOVE_EXECUTOR:
			return Object.assign({}, state, {
				executors: removeSpecificObjectFromArray(state.executors, action.payload, 'email')
			});
		case REMOVE_ALL_EXECUTOR:
			return Object.assign({}, state, {
				executors: []
			})
		default:
			return state;
	}
}