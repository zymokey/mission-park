import React from 'react';

class DropdownInput extends React.Component {

	constructor(props){
		super(props);
	}

	render(){

	  const { menulist, btnId, handleClick } = this.props.dropdown; 

	  var dropdownMenu = menulist.map(function(item, index){
	  	return (
		    <li key={index}><a href="javascript:void(0);" name={item.name} style={item.style}>{item.name}</a></li>
	  	);
	  });

	  return (
	  	<div className="dropdown">
  	  	<button className="dropdown-toggle" type="button" id={btnId} 
  	  	data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" style={this.props.btnStyle}>
  		    {this.props.btnName}
  		  </button>
  		  <ul className="dropdown-menu" onClick={handleClick.bind(this)} aria-labelledby={btnId}>
  		    {dropdownMenu}
  		  </ul>
  	  </div>
  	);
	}

}


export default DropdownInput;