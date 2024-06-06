import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Task } from '@/types/Task'
import { DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'

const Actions = ({ task }: { task: Task }) => {
  const [viewOpen, setViewOpen] = useState(false)

  const handleViewDetails = () => {
    setViewOpen(true)
  }

  const handleClose = () => {
    setViewOpen(false)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <DropdownMenuItem onClick={handleViewDetails}>View</DropdownMenuItem>
        <DropdownMenuItem>View customer</DropdownMenuItem>
        <DropdownMenuItem>View payment details</DropdownMenuItem>
      </DropdownMenuContent>

      <Dialog open={viewOpen} onOpenChange={handleClose}>
        <DialogTitle>Details</DialogTitle>
        <DialogContent className="p-4">
          <DialogDescription>
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold">Title</span>
              <span className="text-gray-500">{task.title}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold">Description</span>
              <span className="text-gray-500">{task.description}</span>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  )
}

export default Actions