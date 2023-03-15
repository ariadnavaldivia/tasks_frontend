import React, { BaseSyntheticEvent, useState } from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { Task } from "@/util/Task";
import Link from "next/link";
import styles from "./tasks-list.module.css";
import { listTasks,deleteTask } from "@/util/api-helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faEye,faPen} from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "./delete-modal";

interface Props {
  tasks: Task[];
}

export default function TasksList(props: Props) {
  const { tasks } = props;
  const [searchName, setSearchName] = useState("");
  const [filterComplete, setFilterComplete] = useState("");
  const [taskList, setTaskList] = useState(tasks);
  const [showModal,setShowModal] = useState(false);
  const [deleteTaskId,setDeleteTaskId] = useState(0);

  async function handleSearch(event: BaseSyntheticEvent) {
    setSearchName(event.target.value);
    let tasks = await listTasks(parseInt(filterComplete), event.target.value);
    if (tasks.success) {
      setTaskList(tasks.data);
    }
  }

  async function handleChangeComplete(event: BaseSyntheticEvent) {
    setFilterComplete(event.target.value);
    let tasks = await listTasks(parseInt(event.target.value), searchName);
    if (tasks.success) {
      setTaskList(tasks.data);
    }
  }

  function closeModal(){
    setShowModal(false)
  }

  function intentDelete(id:any){
    setDeleteTaskId(id)
    setShowModal(true)
  }

  async function deletedSuccessfully(){
    let tasks = await listTasks();
      if (tasks.success) {
        setTaskList(tasks.data);
      }
      
    setShowModal(false)
  }

  return (
    <div>
      <div className={styles.topTable + " my-3"}>
        <div className={styles.rightControl}>
          <input
            type="text"
            className={styles.searchInput + " form-control"}
            placeholder="Search name..."
            onChange={handleSearch}
          />
          <label htmlFor="selectCompleted">Filter:</label>
          <select
            name=""
            id="selectCompleted"
            className="form-control"
            onChange={handleChangeComplete}
          >
            <option value={""}>All</option>
            <option value={1}>Completed</option>
            <option value={0}>Not completed</option>
          </select>
        </div>
        <div>
          <Link href="/tasks/new" className="pull-right">
            <button className={styles.btnNew + " btn btn-primary"}>
              New Task
            </button>
          </Link>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Limit Date</th>
              <th scope="col">Completed</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {taskList.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.limit_date}</td>
                <td>{task.completed ? "Yes" : "No"}</td>
                <td>
                  <div className={styles.btnActions}>
                    <Link href={"/tasks/detail/" + task.id} title='Detail'>
                      <button className="btn btn-outline-primary">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </Link>
                    <Link href={"/tasks/update/" + task.id} title='Edit'>
                      <button className="btn btn-outline-success">
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                    </Link>
                    <button className="btn btn-outline-danger" title='Delete'
                    onClick={()=>intentDelete(task.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteTaskId>0 && <DeleteModal show={showModal} 
      idTask={deleteTaskId}
      closeClick={closeModal} afterDelete={deletedSuccessfully}/>} 
    </div>
  );
}
