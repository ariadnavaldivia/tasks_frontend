import {
    SET_NOTIFICATION
  } from '../actions/types';
  
  const initialState = {
    notification: {
        status: '',
        message : '' ,
        title :''
    }
  };
  
  const notificationReducer = (state = initialState, action) => {
    
    switch (action.type) {
        
      case SET_NOTIFICATION:
        
        return {
          ...state,
          notification: {...action.payload},
        };
      
      default:
        return state;
    }
  };
  
  export default notificationReducer;