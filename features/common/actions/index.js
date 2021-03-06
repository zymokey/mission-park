import axios from 'axios';
import * as types from '../constants';

export function findUsersByName(userName){
	return function(dispatch){
		dispatch(fetchUsersRequest());
		dispatch(openNotification());
		axios.get('/projects/getusers', {
			params: {
				userName: userName
			}
		})
		.then(function(res){
			dispatch(fetchUsersSuccess(res.data.users));
		})
		.catch(function(err){
			dispatch(fetchUsersFailure(err));
		});
	}
}


export function fetchUsers(projectId){
	return function(dispatch){
		dispatch( fetchUsersRequest() );
		dispatch(openNotification());
		axios.get('/projects/getusers', {
			params: {
				projectId: projectId
			}
		})
		.then(function(res){
			dispatch( fetchUsersSuccess(res.data.users) );
		})
		.catch(function(err){
			dispatch( fetchUsersFailure(err) );
		});
	}
}

export function fetchUsersRequest(){
	return {
		type: types.FETCH_USERS_REQUEST
	}
}

export function fetchUsersSuccess(users){
	return {
		type: types.FETCH_USERS_SUCCESS,
		payload: users
	}
}

export function fetchUsersFailure(err){
	return {
		type: types.FETCH_USERS_FAILURE,
		payload: {
			errors: err
		}
	}
}



export function findTagsByName(tagName){
	return function(dispatch){
		dispatch(fetchTagsRequest());
		axios.get('/projects/gettags', {
			params: {
				tagName: tagName
			}
		})
		.then(function(res){
			dispatch(fetchTagsSuccess(res.data));
		})
		.catch(function(err){
			dispatch(fetchTagsFailure(err));
		});
	}
}


export function fetchTags(projectId){
	return function(dispatch){
		dispatch(fetchTagsRequest());
		dispatch(openNotification());
		axios.get('/projects/fetchtags', {
			params: {
				projectId: projectId
			}
		})
		.then(function(res){
			dispatch( fetchTagsSuccess(res.data) );
		})
		.catch(function(err){
			dispatch( fetchTagsFailure(err) );
		});
	}
}

export function fetchTagsRequest(){
	return {
		type: types.FETCH_TAGS_REQUEST
	}
}

export function fetchTagsSuccess(tags){
	return {
		type: types.FETCH_TAGS_SUCCESS,
		payload: tags
	}
}

export function fetchTagsFailure(err){
	return {
		type: types.FETCH_TAGS_FAILURE,
		payload: {
			errors: err
		}
	}
}


export function saveTag(tagName, projectId){		//return value from action or dispatch ?
	return function(dispatch){
		dispatch(saveTagsRequest());
		dispatch(openNotification());
		axios.post('/projects/addtag', {
			tagName: tagName,	
			projectId: projectId
		})
		.then(function(res){
			dispatch( saveTagsSuccess(res.data) );
		})
		.catch(function(err){
			dispatch( saveTagsFailure(err) );
		});
	}
}

export function saveTagsRequest(){
	return {
		type: types.SAVE_TAGS_REQUEST
	}
}

export function saveTagsSuccess(tags){
	return {
		type: types.SAVE_TAGS_SUCCESS,
		payload: tags
	}
}

export function saveTagsFailure(err){
	return {
		type: types.SAVE_TAGS_FAILURE,
		payload: {
			errors: err
		}
	}
}



export function openNotification(){
	return {
		type: types.OPEN_NOTIFICATION
	}
}

export function closeNotification(){
	return {
		type: types.CLOSE_NOTIFICATION
	}
}

export function searchInput(model, searchObj, parentId){
	const modelName = model;
	return function(dispatch){
		dispatch(searchInputRequest());
		dispatch(openNotification());
		axios.post('/tasks/searchinput', {
				model: model,
				searchObj: searchObj,
				parentId: parentId
		})
		.then(function(res){
			if(modelName == 'project'){
				dispatch(updateProjectArr(res.data.projects));
			} else if (modelName == 'tasklist'){
				dispatch(updateTasklistArr(res.data.tasklists));
			} else if (modelName == 'task'){
				dispatch(updateTaskArr(res.data.tasks));
			}
		})
		.catch(function(err){
			dispatch(searchInputFailure(err));
		});
	}
}

export function searchInputRequest(){
	return {
		type: types.SEARCH_INPUT_REQUEST
	}
}

export function updateProjectArr(projects){
	return {
		type: types.UPDATE_PROJECT_ARR,
		payload: projects
	}
}
export function updateTasklistArr(tasklists){
	return {
		type: types.UPDATE_TASKLIST_ARR,
		payload: tasklists
	}
}
export function updateTaskArr(tasks){
	return {
		type: types.UPDATE_TASK_ARR,
		payload: tasks
	}
}

export function searchInputFailure(err){
	return {
		type: types.SEARCH_INPUT_FAILURE,
		payload: {
			errors: err
		}
	}
}

