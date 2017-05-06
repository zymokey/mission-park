import React from 'react';
import { connect } from 'react-redux';
import UploadFileItem from './uploadFileItem';

class Uploader extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			minimize: false
		}
	}

	minimizeCard(flag){
		this.setState({
			minimize: flag
		});
	}

	render(){
		const uploadFiles = this.props.uploadFiles;

		let uploadFileArr = uploadFiles.map(function(item, index){
			return <UploadFileItem key={index} fileInfo={item} />
		});


		return (

			<section className={`background-uploader ${this.state.minimize ? 'minimize' : ''}`}>
				<div className="card">
					<div className="card-header">
						<p className="card-title">正在上传 0/{uploadFiles.length}</p>
						{this.state.minimize && <a className="maximize-uploader glyphicon glyphicon-resize-full" onClick={this.minimizeCard.bind(this, false)}></a>}
						{this.state.minimize || <a className="minimize-uploader glyphicon glyphicon-resize-small" onClick={this.minimizeCard.bind(this, true)}></a>}
						<a className="close-uploader" >×</a>
					</div>
					<ul className="upload-list">
						{uploadFileArr}
					</ul>
				</div>
			</section>

		);

	}

}

const mapStateToProps = state => ({
	uploadFiles: state.fileCenter.uploadFiles
});

export default connect(mapStateToProps, null)(Uploader);

