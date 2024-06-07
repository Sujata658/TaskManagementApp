export interface Activity {
    _id: string
    action: string
    author: string
    task: string
    details?:string
    from?: string
    to?: string
    createdAt: string
    updatedAt: string
    __v: number
  }