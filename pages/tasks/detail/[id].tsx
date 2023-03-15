import { listTasks ,getTask} from "@/util/api-helper"
import { Task } from "@/util/Task"
import { useRouter } from "next/router"
interface Props {
    task : Task 
}

export default function DetailTask(props :Props){

    const {task} = props
    const router = useRouter();

    function goBack(){
        router.push('/')
    }

    return (
        <div>
            <h2>Task Detail</h2>
            {!task && 
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
    const allTasks = allTasksResponse.data.tasks;
    let paths : any[] = []
    if(allTasks){
        paths = allTasks.map(task=>(
            {params : {id:task.id?.toString()}}
        ))
    }
    
    return {
        paths :paths,
        fallback : 'blocking'
    }
}