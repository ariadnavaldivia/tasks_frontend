export interface Task {
    id?:number,
    name : string,
    description : string,
    limit_date : string,
    completed: number,    
    created_at? : string,
    updated_at? : string,
    deleted_at? : string
}