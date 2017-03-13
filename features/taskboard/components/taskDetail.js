import React from 'react';
import { connect } from 'react-redux';

import { ModalWrapper, ModalHeader, ModalFooter } from '../../common/components/modal_dialog';
import Dropdown from './dropdown/dropdown';
import ExecutorsContainer from './executorsContainer';
import { addTask, closeUsersDropdown, removeAllExecutor } from '../actions/taskActions';
import { priorityList, priorityColors, priorityMenuList, repeatList, repeatMenuList } from '../../../utils';

class TaskDetail extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			taskName: '',
			dueDate: '',
			priority: 0,
			description: '',
			repeat: 0
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.selectPriority = this.selectPriority.bind(this);
		this.selectRepeat = this.selectRepeat.bind(this);

		this.priorityDropdown = {
			menulist: priorityMenuList,
			btnId: 'priorityDropdown',
			handleClick: this.selectPriority
		}

		this.repeatDropdown = {
			menulist: repeatMenuList,
			btnId: 'repeatDropdown',
			handleClick: this.selectRepeat
		}
	}

	componentWillMount(){
		const taskDetail = this.props.taskDetail;
		if(taskDetail){
			const { taskName, description, dueDate, priority, repeat, executors } = taskDetail;
			this.setState({
				taskName: taskName,
				description: description,
				dueDate: dueDate,
				priority: priority,
				repeat: repeat,
				executors: executors
			});
		}
	}

	componentDidMount(){
		$('#taskDueDate').datetimepicker();
	}

	handleInputChange(event){
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}

	selectPriority(event){
		const target = event.target;
		const priority = priorityList.indexOf(target.text);
		this.setState({
			priority: priority
		});
	}

	selectRepeat(event){
		const target = event.target;
		const repeat = repeatList.indexOf(target.text);
		this.setState({
			repeat: repeat
		});
	}

	handleSubmit(){
		var payload = {
			tasklistId: this.props.tasklistId,
			taskName: this.state.taskName,
			description: this.state.description,
			dueDate: this.state.dueDate,
			priority: this.state.priority,
			repeat: this.state.repeat,
			executors: this.props.executors
		}
		this.props.addTask(payload);
		this.setState({
			taskName: '',
			description: '',
			dueDate: '',
			priority: 0,
			repeat: 0
		});
		this.props.closeUsersDropdown();
		this.props.removeAllExecutor();
		$('#newTask').click();	// use state?
	}


	render(){

		return(
			<ModalWrapper id={this.props.modalName} >
				<ModalHeader createTaskTo={this.props.currentTasklistName}/>
				<div className="modal-body">

					<div className="row">
						<div className="col-md-12 form-group" >
		        	<input className="form-control" name="taskName" 
			        	placeholder="任务内容" 
			        	onChange={this.handleInputChange} 
			        	value={this.state.taskName} />
			      </div>
			    </div>
		    	
		    	<div className="row">
		    		<div className="col-md-12 form-group">
			    		<textarea className="form-control" name="description" 
			        	placeholder="任务简介" rows="3" 
			        	onChange={this.handleInputChange} 
			        	value={this.state.description}></textarea>
		        </div>
		    	</div>
		      
		      <div className="row">
		      	<div className="col-md-4 form-group">
						  <div className='date'>
						  	<label>截止时间</label>
                <input type='text' placeholder="点击设置" title="点击设置" className="form-control" name='dueDate' id='taskDueDate' 
                	 onBlur={this.handleInputChange} onChange={function(){}} value={this.state.dueDate}/>
              </div>
						</div>

					  <div className="col-md-4 form-group">
					  	<label>优先级</label>
							<Dropdown dropdown={this.priorityDropdown} 
								btnStyle={{color: priorityColors[this.state.priority]}} 
								btnName={priorityList[this.state.priority]} />
		     		</div>

     				<div className="col-md-4 form-group">
	     				<label>重复</label>
	     				<Dropdown dropdown={this.repeatDropdown} 
	     					btnStyle={{color: '#555'}}
								btnName={repeatList[this.state.repeat]} />
	     			</div>
	     		</div>

	     		<div className="row executor-row">
	     			<label>执行者</label>
	     			<ExecutorsContainer projectId={this.props.projectId} />
	     		</div>

	      </div>
				<ModalFooter handleSubmit={this.handleSubmit} />
			</ModalWrapper>
		)
	}

}

const mapStateToProps = state => ({
	currentTasklistName: state.taskboard.task.currentTasklistName,
	executors: state.taskboard.task.executors,
	taskDetail: state.taskboard.task.taskDetail
})

const mapDispatchToProps = (dispatch) => {
	return({
		addTask: taskname => { dispatch(addTask(taskname)); },	//addTask(x) returns a function
		closeUsersDropdown: () => { dispatch(closeUsersDropdown()); },
		removeAllExecutor: () => { dispatch(removeAllExecutor()); }
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail);