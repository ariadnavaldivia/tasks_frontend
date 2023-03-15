import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Fragment } from 'react'
import TasksList from '@/components/tasks/tasks-list'
import { Task } from '@/util/Task'
import { listTasks } from '@/util/api-helper'

const inter = Inter({ subsets: ['latin'] })
interface Props {
  tasks : Task[],
  totalPages : number
}

export default function Home(props:Props) {
  
  return (
    <Fragment>
      <TasksList tasks={props.tasks} totalPages={props.totalPages} />
    </Fragment>
  )
}

export async function getServerSideProps()  {
    
  const tasksResponse = await listTasks();
  const tasks = tasksResponse.data.tasks;

  return {
      props : {
          tasks : tasks,
          totalPages : tasksResponse.data?.totalPages
      }
  }
}