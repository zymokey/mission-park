import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as actionCreators from '../actions';

class SignIn extends React.Component {

	constructor(props,context){
		super(props, context);

    // const storedMessage = localStorage.getItem('successMessage');
    // let successMessage = '';

    // if (storedMessage) {
    //   successMessage = storedMessage;
    //   localStorage.removeItem('successMessage');
    // }

		this.state = {
      // signinErrors: {},
      // successMessage,
      user: {
        email: '',
        password: ''
      }
		}
	}

	handleSubmit(event){
		event.preventDefault();
		this.props.actions.signinUser(this.state.user.email, this.state.user.password, this.context);

    // create a string for an HTTP body message
    // const email = encodeURIComponent(this.state.user.email);
    // const password = encodeURIComponent(this.state.user.password);
    // const formData = `email=${email}&password=${password}`;

    // // create an AJAX request
    // const xhr = new XMLHttpRequest();
    // xhr.open('post', '/auth/signin');
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // xhr.responseType = 'json';
    // xhr.addEventListener('load', () => {
    //   if (xhr.status === 200) {
    //     // success

    //     // change the component-container state
    //     this.setState({
    //       errors: {}
    //     });

    //     // save the token
    //     localStorage.setItem('token', xhr.response.token);
    //     // change the current URL to /
    //     this.context.router.replace('/');
    //   } else {
    //     // failure

    //     // change the component state
    //     const errors = xhr.response.errors ? xhr.response.errors : {};
    //     errors.summary = xhr.response.message;

    //     this.setState({
    //       errors
    //     });
    //   }
    // });
    // xhr.send(formData);
	}

	handleChange(event){
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
    	user
    });
	}

	render(){
		return (
			<div className="container" style={{maxWidth: '360px'}}>
				<form action="/" 
				 onSubmit={this.handleSubmit.bind(this)}
				>
					<h2>Sign In</h2>
					{this.props.errors.summary && <p className="text-danger">{this.props.errors.summary}</p>}
					<div className="form-group">
						<input 
							// floatingLabelText="Email" 
							name="email" 
							type="email" 
							className="form-control" 
							// errorText={this.props.errors.email} 
							onChange={this.handleChange.bind(this)} 
							value={this.state.user.email} 
						/>
						<label className="text-danger">{this.props.errors.email}</label>
		        <input
		          // floatingLabelText="Password"
		          type="password" 
		          className="form-control" 
		          name="password"
		          onChange={this.handleChange.bind(this)}
		          // errorText={this.props.errors.password}
		          value={this.state.user.password}
		        />
		        <label className="text-danger">{this.props.errors.password}</label>
			      <div>
			        <button type="submit" className="btn btn-success btn-group btn-group-justified" >sign in</button>
			      </div>
		      </div>

		      <p>Don't have an account? <Link to={'/signup'}>Create one</Link>.</p>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	errors: state.signinErrors
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actionCreators, dispatch)
});

SignIn.contextTypes = {
	router: PropTypes.object.isRequired
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);