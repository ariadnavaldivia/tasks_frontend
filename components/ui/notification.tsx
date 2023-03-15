import classes from "./notification.module.css";
import { NotificationInterface } from "./notification.interface";


export default function Notification(props: NotificationInterface) {
  const { title, message, status } = props;

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={cssClasses}>
      
      <p>{message}</p>
    </div>
  );
}
