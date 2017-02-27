import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Tasklist from './tasklist';
import AddTasklist from './addTasklist';
import TasklistContainer from './tasklistContainer';
import TaskContainer from './taskContainer';

// import * as actionCreators from '../actions/tasklistActions';
import { fetchTasklist } from '../actions/tasklistActions';
import { fetchTask } from '../actions/taskActions';

class Board extends React.Component {

	constructor(props){
		super(props);
	}

	componentWillMount(){
		this.props.fetchTasklist(this.props.params.projectId);
	}



	render(){

		const { tasklistLoading, tasklists, tasklistError, tasklistInfoText, 
						taskLoading, taskError, taskInfoText, currentTasklistId } = this.props;

		var fetchedTaskList = [];

		fetchedTaskList = tasklists.map(function(tasklist, index){
			return <Tasklist key={index} index={index} tasklist={tasklist} />;
		});

		return(
				<div className="container taskboard">
					{tasklistLoading && <div className="container col-md-9 alert alert-default" role="alert">{tasklistInfoText}.</div>}
					{taskLoading && <div className="container col-md-9 alert alert-default" role="alert">{taskInfoText}.</div>}
					{tasklistError && <div className="container col-md-9 alert alert-danger" role="alert">{tasklistInfoText}.</div>}
					{taskError && <div className="container col-md-9 alert alert-danger" role="alert">{taskInfoText}.</div>}
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
						{ currentTasklistId && <TaskContainer tasklistId={currentTasklistId}/> }
					</div>
				</div>
		)
	}
}

const mapStateToProps = state => {
	const tb = state.taskboard;
	return {
		taskLoading: 						tb.task.taskLoading,
		newTask: 								tb.task.newTask,
		taskError: 							tb.task.taskError,
		taskInfoText: 					tb.task.taskInfoText,
		currentTasklistId: 			tb.task.currentTasklistId,

		tasklistLoading: 				tb.tasklist.tasklistLoading,
		tasklists: 							tb.tasklist.tasklists,
		newTasklist: 						tb.tasklist.newTasklist,
		tasklistError: 					tb.tasklist.tasklistError,
		tasklistInfoText: 			tb.tasklist.tasklistInfoText,
	}
}

const mapDispatchToProps = dispatch => ({
	fetchTasklist: projectId => { dispatch(fetchTasklist(projectId)); },
	fetchTask: tasklistId => { dispatch(fetchTask(tasklistId)); }
})

export default connect(mapStateToProps, mapDispatchToProps)(Board);