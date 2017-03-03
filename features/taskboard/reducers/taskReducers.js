import { 
	ADD_TASK_REQUEST, ADD_TASK_SUCCESS, ADD_TASK_FAILURE, 
	FETCH_TASK_REQUEST, FETCH_TASK_SUCCESS, FETCH_TASK_FAILURE, 
	SET_CURRENT_TASKLIST, 
	NULL_TASKLIST_ID } from '../actions/taskActions';
import { SET_CURRENT_TASKLIST_ID_TO_NULL } from '../actions/tasklistActions';

import { addNewObjectToList } from '../../../utils';

const initialState = {
	taskLoading: false,

	tasks: [],
	newTask: null,

	taskError: false,

	taskInfoText: '',

	currentTasklistId: null,
	activeTasklist: 0,
	currentTasklistName: ''
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
				tasks: addNewObjectToList(state.tasks, action.payload),
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
		default:
			return state;
	}
}