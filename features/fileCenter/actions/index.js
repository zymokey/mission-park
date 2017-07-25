import axios from 'axios';
import * as types from '../constants';
// export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
// export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE';

// export const FETCH_FILES_REQUEST = 'FETCH_FILES_REQUEST';
// export const FETCH_FILES_SUCCESS = 'FETCH_FILES_SUCCESS';
// export const FETCH_FILES_FAILURE = 'FETCH_FILES_FAILURE';
// export const UPDATE_FILE_NAME = 'UPDATE_FILE_NAME';

// export const UPDATE_UPLOAD_PROGRESS = 'UPDATE_UPLOAD_PROGRESS';
// export const ADD_UPLOAD_FILE = 'ADD_UPLOAD_FILE';
// export const UPDATE_COMPLETED_COUNT = 'UPDATE_COMPLETED_COUNT';
// export const DELETE_FILE_SUCCESS = 'DELETE_FILE_SUCCESS';
// export const DELETE_FILE_FAILURE = 'DELETE_FILE_FAILURE';

// export const CREATE_FOLDER_SUCCESS = 'CREATE_FOLDER_SUCCESS';
// export const CREATE_FOLDER_FAILURE = 'CREATE_FOLDER_FAILURE';

// export const CHANGE_CURRENT_FOLDER = 'CHANGE_CURRENT_FOLDER';

// export const UPDATE_FILE_SUCCESS = 'UPDATE_FILE_SUCCESS';
// export const UPDATE_FILE_FAILURE = 'UPDATE_FILE_FAILURE';

// export const SELECT_ITEM = 'SELECT_ITEM';
// export const UNSELECT_ITEM = 'UNSELECT_ITEM';
// export const SELECT_ALL = 'SELECT_ALL';
// export const UNSELECT_ALL = 'UNSELECT_ALL';

// export const SET_SELECTED_ITEM_AMOUNT_TO_ZERO = 'SET_SELECTED_ITEM_AMOUNT_TO_ZERO';

// export const CLOSE_UPLOADER = 'CLOSE_UPLOADER';

export function uploadFileSuccess(file){
	return {
		type: types.UPLOAD_FILE_SUCCESS,
		payload: file
	}
}

export function uploadFileFailure(err){
	return {
		type: types.UPLOAD_FILE_FAILURE,
		payload: err
	}
}

export function updateUploadProgress(data){
	return {
		type: types.UPDATE_UPLOAD_PROGRESS,
		payload: {
			timestamp: data.timestamp,
			filename: data.filename,
			fileSize: data.fileSize,
			folder: data.folder,
			percentage: data.percentage
		}
	}
}

export function updateCompletedCount(){
	return {
		type: types.UPDATE_COMPLETED_COUNT
	}
}

export function addUploadFile(data){
	return {
		type: types.ADD_UPLOAD_FILE,
		payload: {
			timestamp: data.timestamp,
			filename: data.filename,
			fileSize: data.fileSize,
			folder: data.folder,
			percentage: data.percentage
		}
	}
}
export function fetchFiles(projectId, folderId){
	return function(dispatch){
		dispatch(fetchFilesRequest());
		axios.get('/filecenter/fetch',{
			params: {
				projectId: projectId,
				folderId: folderId
			}
		})
		.then(function(res){
			dispatch(fetchFilesSuccess(res.data.files));
		})
		.catch(function(err){
			dispatch(fetchFilesFailure(err));
		});
	}
}

export function fetchFilesRequest(){
	return {
		type: types.FETCH_FILES_REQUEST
	}
}

export function fetchFilesSuccess(files){
	return {
		type: types.FETCH_FILES_SUCCESS,
		payload: files
	}
}
export function fetchFilesFailure(err){
	return {
		type: types.FETCH_FILES_FAILURE,
		payload: err
	}
}

export function updateFileName(file){
	return {
		type: types.UPDATE_FILE_NAME,
		payload: file
	}
}

export function deleteFile(fileId){
	return function(dispatch){
		axios.get('/filecenter/delete', {
			params: {
				fileId: fileId
			}
		})
		.then(function(res){
			dispatch(deleteFileSuccess(res.data.fileId));
		})
		.catch(function(err){
			dispatch(deleteFileFailure(err));
		});
	}
}

export function deleteFileSuccess(fileId){
	return {
		type: types.DELETE_FILE_SUCCESS,
		payload: fileId
	}
}
export function deleteFileFailure(err){
	return {
		type: types.DELETE_FILE_FAILURE,
		payload: err
	}
}


export function createFolder(payload){
	return function(dispatch){
		axios.post('/filecenter/createfolder', payload)
			.then(function(res){
				dispatch(createFolderSuccess(res.data.folder));
			})
			.catch(function(err){
				dispatch(createFolderFailure(err));
			})
	}
}

export function createFolderSuccess(folder){
	return {
		type: types.CREATE_FOLDER_SUCCESS,
		payload: folder
	}
}
export function createFolderFailure(err){
	return {
		type: types.CREATE_FOLDER_FAILURE,
		payload: err
	}
}


export function changeCurrentFolder(folder){
	return {
		type: types.CHANGE_CURRENT_FOLDER,
		payload: folder
	}
}

export function updateFileSuccess(oldFileId, file){
	return {
		type: types.UPDATE_FILE_SUCCESS,
		payload: {
			oldFileId: oldFileId,
			file: file
		}
	}
}
export function updateFileFailure(err){
	return {
		type: types.UPDATE_FILE_FAILURE,
		payload: err
	}
}

export function selectItem(payload){
	return {
		type: types.SELECT_ITEM,
		payload: payload
	}
}

export function unselectItem(payload){
	return {
		type: types.UNSELECT_ITEM,
		payload: payload
	}
}

export function selectAll(){
	return {
		type: types.SELECT_ALL
	}
}

export function unselectAll(){
	return {
		type: types.UNSELECT_ALL
	}
}

export function setSelectedItemAmountToZero(){
	return {
		type: types.SET_SELECTED_ITEM_AMOUNT_TO_ZERO
	}
}


export function closeUploader(){
	return {
		type: types.CLOSE_UPLOADER
	}
}