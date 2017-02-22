import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Tasklist from './tasklist';
import AddTasklist from './addTasklist';
import TasklistContainer from './tasklistContainer';
import TaskContainer from './taskContainer';

import * as actionCreators from '../actions';

class Board extends React.Component {

	constructor(props){
		super(props);
	}

	componentWillMount(){
		this.props.actions.fetchTasklist(this.props.params.projectId);
	}

	render(){

		const { isLoading, tasklists, newTasklist, isError, infoText, currentTasklistId } = this.props;

		var fetchedTaskList = [];

		fetchedTaskList = tasklists.map(function(tasklist, index){
			return <Tasklist key={index} tasklist={tasklist} />;
		});

		var tasklistId = null;

		if(currentTasklistId) {
			tasklistId = currentTasklistId;
		} else if (tasklists.length > 0) { 
			tasklistId = tasklists[0]._id; 
		}

		return(
				<div className="container taskboard">
					{isLoading && <div className="container col-md-9 alert alert-default" role="alert">{infoText}.</div>}
					{isError && <div className="container col-md-9 alert alert-danger" role="alert">{infoText}.</div>}
					<div className="row">
						<div className="col-md-4">
							<div className="btn-group" role="group" aria-label="Basic example">
							  <AddTasklist projectId={this.props.params.projectId} />
							  <button type="button" className="btn btn-secondary">btn2</button>
							  <button type="button" className="btn btn-secondary">btn3</button>
							</div>
							<TasklistContainer>
								{fetchedTaskList}
							</TasklistContainer>
						</div>
						<TaskContainer tasklistId={tasklistId}/>
					</div>
				</div>
		)
	}
}

const mapStateToProps = state => ({
	isLoading: state.task.isLoading,
	tasklists: state.task.tasklists,
	newTasklist: state.task.newTasklist,
	newTask: state.task.newTask,
	isError: state.task.isError,
	infoText: state.task.infoText,
	currentTasklistId: state.task.currentTasklistId
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Board);