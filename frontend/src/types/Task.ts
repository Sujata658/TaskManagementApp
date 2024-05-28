import { User } from "./User"

export interface Response<T> {
  status: number
  message: string
  data: T
}


export interface TaskProps {
    title: string
    description: string
    dueDate?: string
    priority?: string
    color?: string
    assignees?: string[]
    tags?: Tag[] 
}



export interface Task {
    _id: string
    title: string
    description: string
    duedate: string
    priority: string
    author: Partial<User>
    color: string
    assignees: Assignee[]
    createdAt: string
    updatedAt: string
    __v: number
    comments: Comment[]
    tags: string[]
  }
  
  export interface Assignee {
    _id: string
    name: string
    email: string
  }
  
  export interface Comment {
    _id: string
    content: string
    author: string
    createdAt: string
  }

  export interface Tag{
    _id: string
    name: string
    tasks: string[]
  }
  