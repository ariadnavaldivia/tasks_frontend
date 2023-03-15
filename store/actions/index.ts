import {
    SET_NOTIFICATION
  } from "./types";
  
  import { NotificationInterface } from "@/components/ui/notification.interface";

  export const setNotification = (notification : NotificationInterface) => {
    console.log("ponemos setnotification")
    return {
      type: SET_NOTIFICATION,
      payload: notification,
    };
  };
  
  
  