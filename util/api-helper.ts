import { Task } from "./Task";

const urlApi = process.env.apiUrl;
const apiKey = process.env.apiKey;

interface responseList {
    success: boolean,
    data: Task[],
    message: string
}

interface responseItem {
    success: boolean,
    data: Task | null,
    message: string
}

export async function listTasks(completed: number | null = null, search: string | null = null) {

    const fullUrl = `${urlApi}/tasks/list`;

    let response: responseList = await fetch(fullUrl, {
        method: 'POST',
        body: JSON.stringify({ completed: completed, search: search }),
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey ? apiKey : ''
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log("data")
            return data

        })

    return response;
}

export async function createTask(taskData: Task) {

    const fullUrl = `${urlApi}/tasks/create`;

    const response: responseItem = await fetch(fullUrl, {
        method: 'POST',
        body: JSON.stringify(taskData),
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey ? apiKey : ''
        }
    })
        .then(res => res.json())
        .then(data => {
            return data
        })

    return response
}


export async function getTask(id: number) {

    console.log("id ", id)
    const fullUrl = `${urlApi}/tasks/get-task`;

    let response: responseList = await fetch(fullUrl, {
        method: 'POST',
        body: JSON.stringify({ id: id }),
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey ? apiKey : ''
        }
    })
        .then(res => res.json())
        .then(data => {
            return data
        })

    console.log(response)
    return response;
}

export async function updateTask(taskData: Task) {

    const fullUrl = `${urlApi}/tasks/update`;

    const response: responseItem = await fetch(fullUrl, {
        method: 'POST',
        body: JSON.stringify(taskData),
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey ? apiKey : ''
        }
    })
        .then(res => res.json())
        .then(data => {
            return data
        })

    return response
}

export async function deleteTask(id: number) {

    const fullUrl = `${urlApi}/tasks/delete`;

    const response: responseItem = await fetch(fullUrl, {
        method: 'POST',
        body: JSON.stringify({ id: id }),
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey ? apiKey : ''
        }
    })
        .then(res => res.json())
        .then(data => {
            return data
        })

    return response
}