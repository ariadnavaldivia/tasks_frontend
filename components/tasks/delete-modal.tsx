import { MouseEventHandler } from "react";
import styles from "./delete-modal.module.css";
import Loader from '../ui/loader';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "@/util/api-helper";
import { setNotification } from "@/store/actions";

interface Props {
  show: boolean;
  idTask : number;
  closeClick : MouseEventHandler;
  afterDelete : Function;
}

export default function DeleteModal(props: Props) {
  const { show, idTask,closeClick ,afterDelete} = props;
  const [loading,setLoading] = useState(false);

  const dispatch = useDispatch();

  async function deleteById(){
    console.log("borramos ",idTask)
    setLoading(true)
    const response = await deleteTask(idTask);
    console.log(response)
    setLoading(false)
    if(response.success){
        dispatch(setNotification({'message':response.message,'status':'success'}))
        afterDelete()
    }else{
        dispatch(setNotification({'message':response.message,'status':'error'}))
    }
    setTimeout(() => {
        dispatch(setNotification({'message':'','status':''}))
    }, 3000);
  }
  
  return (

    <div className={styles.modalComponent}>
      <div
        className={"modal fade " + (show ? styles.show + " show" : "")}
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Task</h5>
              <button
                type="button"
                className={styles.modalClose + " close"}
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeClick}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure to delete this task?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger"
              onClick={deleteById}>
                <span>Delete</span>
                {loading && <Loader/> }                 
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={closeClick}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      {show && <div className={(show?'show ':'')+"modal-backdrop fade"}></div>}
    </div>
  );
}
