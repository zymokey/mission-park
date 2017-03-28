import React from 'react';
import { connect } from 'react-redux';
import TriggerBtn from '../../common/components/modal_dialog/triggerBtn';
import { removeAllExecutor, removeAllTag } from '../actions/taskActions';
import TaskDetail from './taskDetail';

class AddTask extends React.Component {
	constructor(props){
		super(props);
		this.btnClick = this.btnClick.bind(this);
	}

	componentDidMount(){
		$('[data-target="#newTask"]')[0].addEventListener('click', this.btnClick, false);
	}

	componentWillUnmount(){
		$('[data-target="#newTask"]')[0].addEventListener('click', this.btnClick, false);
	}

	btnClick(e){
		this.props.removeAllExecutor();
		this.props.removeAllTag();
	}

	render(){
		return(
			<div className="toolbar-btn">
				<TriggerBtn dataTarget="#newTask" btnName="添加新任务"/>
				<TaskDetail modalName="newTask" projectId={this.props.projectId} tasklistId={this.props.tasklistId} />
			</div>
		)
	}
}

// const mapStateToProps = state => ({
// 	currentTasklistName: state.taskboard.task.currentTasklistName,
// 	executors: state.taskboard.task.executors
// })

const mapDispatchToProps = (dispatch) => {
	return({
		removeAllExecutor: () => { dispatch(removeAllExecutor()); },
		removeAllTag: () => { dispatch(removeAllTag()); }
	})
}

// ({
// 	actions: bindActionCreators(actionCreators, dispatch)
// })

export default connect(null, mapDispatchToProps)(AddTask);

// export default AddTask;

