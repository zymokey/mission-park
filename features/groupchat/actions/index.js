import axios from 'axios';

export const UPDATE_ONLINE_USERS = 'UPDATE_ONLINE_USERS';
export const NEW_MESSAGE = 'NEW_MESSAGE';

export const GET_MESSAGE_HISTORY_SUCCESS = 'GET_MESSAGE_HISTORY_SUCCESS';
export const GET_MESSAGE_HISTORY_FAILURE = 'GET_MESSAGE_HISTORY_FAILURE';

export function updateOnlineUsers(user, userlist){
	return {
		type: 'UPDATE_ONLINE_USERS',
		payload: {
			user: user,
			userlist: userlist
		}
	}
}

export function newMessage(data){
	return {
		type: 'NEW_MESSAGE',
		payload: {
			message: data.message,
			file: data.file,
			timestamp: data.timestamp,
			senderId: data.senderId,
			senderName: data.senderName,
			byself: data.byself
		}
	}
}

export function getMessageHistory(projectId){
	return function(dispatch){
		axios.get('/chat/getmessagehistory', {
				params: { 
					room: projectId 
				}
			})
			.then(function(res){
				dispatch(getMessageHistorySuccess(res.data.messages));
			})
			.catch(function(err){
				dispatch(getMessageHistoryFailure(err));
			});
	}
}

export function getMessageHistorySuccess(messages){
	return {
		type: 'GET_MESSAGE_HISTORY_SUCCESS',
		payload: {
			messages: messages
		}
	}
}

export function getMessageHistoryFailure(error){
	return {
		type: 'GET_MESSAGE_HISTORY_FAILURE',
		payload: {
			error: error
		}
	}
}

export function uploadChatFile(form){
	axios.post('/chat/uploadfile', {
		
	})
	.then(function(res){

	})
	.catch(function(err){
		console.log(err);
	});
}