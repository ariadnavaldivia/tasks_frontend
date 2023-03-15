import { Fragment } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import Notification from "./notification";
import { NotificationInterface } from "./notification.interface";

interface Props {
    children?: any;
}

export default function Layout(props:Props){
    const notification = useSelector(
        (state: { notification: {notification:NotificationInterface} }) => 
        state.notification.notification
    );
    return <Fragment>
        <Header/>
        
        <main className="container">{props.children}</main>
        {notification && notification.message &&
        <Notification title={notification.title} message={notification.message} 
        status={notification.status} />} 
    </Fragment>
}   