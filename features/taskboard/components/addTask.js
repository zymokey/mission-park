import React from 'react';
// import ReactDOM from 'react-dom';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ModalWrapper, ModalHeader, ModalFooter, TriggerBtn } from '../../common/components/modal_dialog';
import Dropdown from './dropdown/dropdown';
import ExecutorsContainer from './executorsContainer';
import { removeAllExecutor } from '../actions/taskActions';
// import { priorityList, priorityColors, priorityMenuList, repeatList, repeatMenuList } from '../../../utils';
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
	}

	render(){
		return(
			<div>
				<TriggerBtn dataTarget="#newTask" btnName="添加新任务"/>
				<TaskDetail modalName="newTask" tasklistId={this.props.tasklistId} />
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
		removeAllExecutor: () => { dispatch(removeAllExecutor()); }
	})
}

// ({
// 	actions: bindActionCreators(actionCreators, dispatch)
// })

export default connect(null, mapDispatchToProps)(AddTask);

// export default AddTask;

