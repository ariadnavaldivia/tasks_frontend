import { listTasks ,getTask} from "@/util/api-helper"
import { Task } from "@/util/Task"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Loader from "@/components/ui/loader"

interface Props {
    task : Task 
}

export default function DetailTask(props :Props){

    /* const {task} = props */
    const [task,setTask] = useState<Task|null>()
    const [loading,setLoading] = useState(true)
    const router = useRouter();

    function goBack(){
        router.push('/')
    }

    useEffect(()=>{
        if(router.isReady){
            const id = router.query.id?.toString();
            let idNum : number= parseInt(id!);
            if(id && !isNaN(idNum) && idNum.toString()==id){
                getTask(parseInt(id!)).then(response=>{
                    setLoading(false)
                    return setTask(response.data)
                });
            }
            setLoading(false)
        }
        
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[router.isReady])

    return (
        <div>
            <h2>Task Detail</h2>
            
            {!loading && !task && 
                <p>No task found</p>
            }

            {
                task &&
                <div>
                    <p><strong>Name :</strong>  {task.name}</p>
                    <p><strong>Description :</strong> {task.description}</p>
                    <p><strong>Limit Date :</strong> {task.limit_date}</p>
                    <p><strong>Completed : </strong>{task.completed?'Yes':'No'}</p>
                    <button className="btn btn-outline-primary btn-grow-mobile" 
                    onClick={goBack}>Go back</button>
                </div>
            }
        </div>
        
    )
}