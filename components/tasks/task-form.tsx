import styles from './task-form.module.css';
import { useEffect, useState } from 'react';
import { Task } from '@/util/Task';
import { createTask, updateTask } from '@/util/api-helper';
import { useDispatch } from "react-redux";
import {setNotification} from '../../store/actions/index'
import { useRouter } from 'next/router';
import Loader from '../ui/loader';

interface Props {
    mode : string,
    taskToUpdate? : Task
}

export default function TaskForm(props:Props) {

    const {mode,taskToUpdate} = props;
    const initialTask = taskToUpdate && mode == 'edit'?taskToUpdate : {
        name : '',
        description : '',
        limit_date : '',
        completed:0
    };

    const[taskData,setTaskData] = useState(initialTask)
    const[errors,setErrors] = useState({
        name : null,
        description : null,
        limit_date : null,
        completed : null
    });
    const [loading,setIsLoading] = useState(false)
    
    const router = useRouter();
    const dispatch = useDispatch()

    function handleChange(event:any){   

        if(event.target.value && event.target.value!==''){
            setErrors(prev=>{
                return {
                    ...prev,
                    [event.target.name] : null
                }
            })
        }     

        setTaskData(prevData=>{
            return {
                ...prevData,
                [event.target.name] : event.target.value
            }
        })
    }

    console.log(errors)
    async function handleSave(event:any){

        event.preventDefault();
        setIsLoading(true)
        console.log(taskData)

        let errorsTemp : any= {};
        let error = false;

        if(!taskData.name || taskData.name==''){
            errorsTemp['name'] = 'Name is required';
            error = true;
        }
        if(!taskData.description || taskData.description==''){
            errorsTemp['description'] = 'Description is required';
            error = true
        }
        if(!taskData.limit_date || taskData.limit_date==''){
            errorsTemp['limit_date'] = 'Limit date is required';
            error = true
        }
        if(taskData.completed === null){
            errorsTemp['completed'] = 'Completed is required';
            error = true
        }

        taskData.completed= parseInt(taskData.completed.toString())

        if(error) {
            setErrors(prev=> {
                return {
                    ...prev,
                    ...errorsTemp
                }
            })
            setIsLoading(false)
            return;
        }

        let response ;
        if(mode=='create'){
            response = await createTask(taskData);
            console.log("response ",response)
        }else{
            response = await updateTask(taskData);
            console.log("response ",response)
        }

        
        if(response.success){
            dispatch(setNotification({title:'Success!',message:response.message,status:'success'}))
        }else{
            dispatch(setNotification({title:'Error',message:response.message,status:'error'}))
        }   
        setIsLoading(false)
        setTimeout(() => {
            dispatch(setNotification({title:'',message:'',status:''}))
        }, 3000);
        router.push('/');
        
    }

    
  return (
    <form onSubmit={handleSave}>
      <div className="row">
        <div className="col-md-6 col-xs-12">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className={(errors.name?'invalid':'')+' form-control'} id="name" name='name'
            value={taskData.name} onChange={handleChange}/>
            {errors.name && <span className={styles.errorAlert}>{errors.name}</span>} 
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className={(errors.description?'invalid':'')+' form-control'}
              id="description"
              name='description'
              rows={3}
              value={taskData.description}
              onChange={handleChange}
            ></textarea>
            {errors.description && <span className={styles.errorAlert}>{errors.description}</span>} 
          </div>
        </div>
        <div className="col-md-6 col-xs-12">
          <div className="form-group">
            <label htmlFor="limit_date">Limit Date</label>
            <input type="date"  className={(errors.limit_date?'invalid':'')+' form-control'}id="limit_date" 
            name='limit_date'
            value={taskData.limit_date} onChange={handleChange} />
            {errors.limit_date && <span className={styles.errorAlert}>{errors.limit_date}</span>} 
          </div>
          <div className="form-group">
            <label htmlFor="completed">Completed</label>
            <select className={styles.combo + (errors.completed?'invalid':'')+ ' form-control'} id="completed"
             value={taskData.completed.toString()}
             name='completed'
             onChange={handleChange}>
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
            {errors.completed && <span className={styles.errorAlert}>{errors.completed}</span>} 
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-primary mb-2 my-3"
      disabled={loading}>
        <span>Save</span>
        {loading &&  <Loader /> }
      </button>
    </form>
  );
}
