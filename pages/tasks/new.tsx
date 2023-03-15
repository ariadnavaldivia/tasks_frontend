import TaskForm from "@/components/tasks/task-form"


export default function NewTask(){
    return (
        <div>
            <h2>New Task</h2>
            <TaskForm mode="create" />
        </div>
    )
}