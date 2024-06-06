import { Button } from "@/components/ui/button";
import { DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { useUser } from "@/context/UserContext";
import { Task } from "@/types/Task";
import moment from "moment";
import { useState } from "react";
import { IoCalendar, IoTrashBin } from "react-icons/io5";

interface ViewDetailsDialogProps<TData> {
    task: TData;
}

const formatDueDate = (duedate: string) => {
    const dueDate = moment(duedate);
      const now = moment();
      const hoursLeft = dueDate.diff(now, 'hours');
      const daysLeft = dueDate.diff(now, 'days');
      
      let timeLeft;
      if (hoursLeft <= 0) {
        timeLeft = "Overdue";
      } else if (hoursLeft <= 24) {
        timeLeft = `${hoursLeft} hours left`;
      } else if (daysLeft <= 1) {
        timeLeft = `${daysLeft} day left`;
      }
      else {
        timeLeft = `${daysLeft} days left`;
      }
  
      return (
        <div>
          {timeLeft}
        </div>
      );
    }


    const ViewDetailsDialog: React.FC<ViewDetailsDialogProps<Task>> = ({ task }) => {
        const {user} = useUser();
        
        const [editing, setEditing] = useState(false);
        const [editedTask, setEditedTask] = useState(task);
    
        const handleEditClick = () => {
            setEditing(true);
        };
    
        const handleCancelEdit = () => {
            setEditing(false);
            setEditedTask(task);
        };
    
        const handleSaveEdit = () => {
            setEditing(false);
        };
    
        const handleFieldChange = (fieldName: keyof Task, value: any) => {
            setEditedTask({
                ...editedTask,
                [fieldName]: value,
            });
        };
    return (
        <>
            <div className="h-[80vh]">
                <DialogTitle>
                    <div className="text-2xl font-bold border-b border-muted-foreground">
                        {editing ? (
                            <input
                                type="text"
                                value={editedTask.title}
                                onChange={(e) => handleFieldChange('title', e.target.value)}
                            />
                        ) : (
                            task.title
                        )}
                    </div>
                </DialogTitle>
                <DialogDescription className="p-4 text-foreground flex flex-col gap-2">
                    <div className="flex justify-between mb-4">

                        <div className="flex flex-wrap gap-4 items-center w-full md:w-1/2">
                            <div className="text-lg font-bold ">Priority:</div>
                            <p className="">{task.priority}</p>
                        </div>

                        <div className="">
                            <p className="py-2 px-4 border rounded bg-yellow-500">{task.status}</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-lg font-bold">Author:</div>
                        <div className="text-md text-background bg-blue-800 p-2 rounded-full">
                            {task.author.name}
                        </div>
                    </div>
                    <div className="flex justify-between items-center ">
                        <div className="flex gap-4 items-center">

                            <div className="text-lg font-bold ">Due Date:</div>
                            <p className="">{moment(task.dueDate).format('DD MMM YYYY')}</p>
                        </div>
                            <div>
                        <div className="flex items-center gap-2">
                            <IoCalendar/>
                            {formatDueDate(task.dueDate)}
                        </div>
                    </div>
                    </div>
                    
                    <div className="flex justify-between items-center my-4">
                        <div className="flex items-center gap-4">
                            <div className="text-lg font-bold">Tags:</div>

                            {task.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-muted border border-muted-foreground text-muted-foreground rounded-full">{tag.name}</span>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-wrap mb-4">
                        <div className="flex flex-wrap gap-4 items-center w-full md:w-1/2">
                            <div className="text-lg font-bold ">Assignees:</div>
                            <ul className="flex gap-2 flex-wrap">
                                {task.assignees.map((assignee, index) => (
                                    <li key={index}>
                                        <span className="text-yellow-600 list-disc list-inside bg-muted px-3 py-1 border border-muted-foreground rounded-full">{assignee.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                       
                    </div>

                    <div>
                        <div className="text-lg font-bold">Description:</div>
                        <p className="h-[80px] py-2 px-1 bg-muted rounded-sm">{task.description}</p>

                    </div>

                </DialogDescription>
                <DialogFooter>
                {user?._id == task.author._id ? (
                    <Button variant="destructive">
                        <IoTrashBin />
                        Delete
                    </Button>
                ) : (
                    <Button variant="destructive" disabled>
                        Delete
                    </Button>
                )}
                {editing ? (
                    <>
                        <Button variant="secondary" onClick={handleCancelEdit}>
                            Cancel
                        </Button>
                        <Button variant="secondary" onClick={handleSaveEdit}>
                            Save
                        </Button>
                    </>
                ) : (
                    <Button variant="secondary" onClick={handleEditClick}>
                        Edit
                    </Button>
                )}
            </DialogFooter>
            </div>
        </>
    );
};

export default ViewDetailsDialog;