import TaskForm from "@/components/tasks/task-form"
import { getTask, listTasks } from "@/util/api-helper";
import { Task } from "@/util/Task";

interface Props{
    task : Task
}

export default function DetailTask(props:Props){
    const {task} = props
    return (
        <div>
            <h2>Update Task</h2>
            {task &&  <TaskForm mode="edit" taskToUpdate={task}/>}
            {!task &&
            <p>No task found</p>
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
        fallback : true
    }
}