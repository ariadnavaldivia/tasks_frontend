import {
    SET_NOTIFICATION
  } from "./types";
  
  import { NotificationInterface } from "@/components/ui/notification.interface";

  export const setNotification = (notification : NotificationInterface) => {
    
    return {
      type: SET_NOTIFICATION,
      payload: notification,
    };
  };
  
  
  