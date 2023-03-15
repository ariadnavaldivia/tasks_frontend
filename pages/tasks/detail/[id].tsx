import { listTasks ,getTask} from "@/util/api-helper"
import { Task } from "@/util/Task"

interface Props {
    task : Task 
}

export default function DetailTask(props :Props){

    const {task} = props
    return (
        <div>
            <h2>Detail</h2>
            {!task && 
                <p>No task found</p>
            }

            {
                task &&
                <div>
                    <p>Name : {task.name}</p>
                    <p>Description : {task.description}</p>
                    <p>Limit Date : {task.limit_date}</p>
                    <p>Completed : {task.completed?'Yes':'No'}</p>
                </div>
            }
        </div>
        
    )
}

export async function getStaticProps(context:any){

    const {params} = context
    const id = params.id
    const taskResponse = await getTask(id);

    const task = taskResponse.success? taskResponse.data : null;

    return {
        props : {
            task:task
        }
    }

}

export async function getStaticPaths () {
    
    const allTasksResponse = await listTasks();
    const allTasks = allTasksResponse.data;
    const paths = allTasks.map(task=>(
        {params : {id:task.id?.toString()}}
    ))
    return {
        paths :paths,
        fallback : false
    }
}