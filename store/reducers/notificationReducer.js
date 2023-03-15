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
    console.log("action type ",action.type)
    switch (action.type) {
        
      case SET_NOTIFICATION:
        console.log("siii ",action.payload)
        return {
          ...state,
          notification: {...action.payload},
        };
      
      default:
        return state;
    }
  };
  
  export default notificationReducer;