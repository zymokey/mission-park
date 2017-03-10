module.exports = {

  priorityList: ['一般', '紧急', '非常紧急'],
  priorityColors: ['#555', '#ffaf38', '#ff4f3e'],
  repeatList: ['不重复', '每小时', '每天', '每周', '每月', '每年'],
  
  escapeRegex: function(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  },

  formatDate: function(date){
    return date.replace('T', ' ').slice(0, -8);
  },

  checkHttpStatus: function (response){
  	if(response.status >= 200 && response.status < 300){
  		return response;
  	} else {
  		var err = new Error(response.statusText);
  		err.response = response;
  		throw err;
  	}
  },

  createConstants: function (...constants) {
      return constants.reduce((acc, constant) => {
          acc[constant] = constant;
          return acc;
      }, {});
  },

  createReducer: function (initialState, reducerMap) {
    return (state = initialState, action) => {
      const reducer = reducerMap[action.type];

      return reducer
        ? reducer(state, action.payload)
        : state;
    };
  },


  checkUserSignin: function (){
    return !!localStorage.getItem('token');
  },

  deAuthenticateUser: function (){
    localStorage.removeItem('token');
  },

  addNewObjectToArrayBegin: function (list, newObject){
    var newList = list.slice(0);
    newList.unshift(newObject);
    return newList;
  },

  addNewObjectToArrayEnd: function (list, newObject){
    return list.concat(newObject);
  },

  getQueryVariable: function (url, key){
    if(~url.indexOf('?')){
      var query = url.split('?')[1];
      var variables = query.split('&');
      for(var i = 0; i < variables.length; i++){
        var pair = variables[i].split('=');
        if(key == pair[0]){
          return pair[1];
        }
      }
    } else {
      return null;
    }
  },

  getIndexOfObjectArray: function(objectArr, obj, attribute){
    return objectArr.map(function(item, index){
      return item[attribute];
    }).indexOf(obj[attribute]);
  },

  removeSpecificObjectFromArray: function(objectArr, obj, attribute){ //return a new array instead of mutating the original array
    return objectArr.filter(function(object){
      return object[attribute] != obj[attribute];
    });
  }

}
