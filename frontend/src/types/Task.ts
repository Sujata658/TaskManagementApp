export interface TaskProps {
    title: string
    description: string
    duedate?: string
    priority?: number
    assignees?: string[]
    tags?: string[]  
    comments?: Comment[]
}


export interface Task {
    _id: string
    title: string
    description: string
    duedate: string
    priority: number
    author: string
    assignees: Assignee[]
    createdAt: string
    updatedAt: string
    __v: number
    comments: Comment[]
    tags?: string[]
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
  