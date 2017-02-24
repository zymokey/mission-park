import axios from 'axios';
import { fetchTask } from './taskActions';

export const ADD_TASKLIST_REQUEST = 'ADD_TASKLIST_REQUEST';
export const ADD_TASKLIST_SUCCESS = 'ADD_TASKLIST_SUCCESS';
export const ADD_TASKLIST_FAILURE = 'ADD_TASKLIST_FAILURE';

export const FETCH_TASKLIST_REQUEST = 'FETCH_TASKLIST_REQUEST';
export const FETCH_TASKLIST_SUCCESS = 'FETCH_TASKLIST_SUCCESS';
export const FETCH_TASKLIST_FAILURE = 'FETCH_TASKLIST_FAILURE';

export function addTasklist(payload){
	return function(dispatch){
		dispatch(addTasklistRequest());
		axios.post('/tasks/addtasklist', payload)
		.then(function(res){
			dispatch(addTasklistSuccess(res.data.tasklist));
		})
		.catch(function(err){
			dispatch(addTasklistFailure(err));
		});
	}
}

export function addTasklistRequest(){
	return {
		type: 'ADD_TASKLIST_REQUEST'
	}
}

export function addTasklistSuccess(tasklist){
	return {
		type: 'ADD_TASKLIST_SUCCESS',
		payload: tasklist
	}
}

export function addTasklistFailure(err){
	return {
		type: 'ADD_TASKLIST_FAILURE',
		payload: {
			errors: err
		}
	}
}

export function fetchTasklist(projectId){
	return function(dispatch){
		dispatch(fetchTasklistRequest());
		axios.get('/tasks/fetchtasklist', {
			params: {
				projectId: projectId
			}
		})
		.then(function(res){
			dispatch(fetchTasklistSuccess(res.data.tasklists));
			res.data.tasklists[0] && dispatch(fetchTask(res.data.tasklists[0]._id));
		})
		.catch(function(err){
			dispatch(fetchTasklistFailure(err));
		});
	}
}

export function fetchTasklistRequest(){
	return {
		type: 'FETCH_TASKLIST_REQUEST'
	}
}

export function fetchTasklistSuccess(tasklists){
	return {
		type: 'FETCH_TASKLIST_SUCCESS',
		payload: tasklists
	}
}

export function fetchTasklistFailure(err){
	return {
		type: 'FETCH_TASKLIST_FAILURE',
		payload: {
			errors: err
		}
	}
}
