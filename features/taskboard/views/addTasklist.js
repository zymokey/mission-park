import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ModalWrapper, ModalHeader, ModalFooter, TriggerBtn } from '../../../components/modal_dialog';
import * as actionCreators from '../actions/tasklistActions';

class AddTasklist extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			tasklistName: ''
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event){
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}

	handleSubmit(){
		var payload = {
			tasklistName: this.state.tasklistName,
			projectId: this.props.projectId
		}
		this.props.actions.addTasklist(payload);
		this.setState({
			tasklistName: ''
		});
		$('#addTasklist').click();
	}

	render(){
		return(
			<div>
				<TriggerBtn dataTarget="#addTasklist" />
				<ModalWrapper id="addTasklist" >
					<ModalHeader createTasklistTo='project'/>
					<div className="modal-body">
						<div className="form-group" >
		        	<input className="form-control" name="tasklistName" 
			        	placeholder="列表名称" 
			        	onChange={this.handleInputChange} 
			        	value={this.state.tasklistName} />
			      </div>
		      </div>
					<ModalFooter handleSubmit={this.handleSubmit} />
				</ModalWrapper>
			</div>
		)
	}

}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(null, mapDispatchToProps)(AddTasklist);