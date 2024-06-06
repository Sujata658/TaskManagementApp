import { Card } from "@/components/ui/card";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SortableTaskProps } from "@/types/KanbanColumn";
import moment from "moment";

import { IoMdCalendar } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { Menubar, MenubarItem } from "@/components/ui/menubar";
import { Menu, MenubarContent, MenubarTrigger } from "@radix-ui/react-menubar";


const SortableTask = ({ task, columnId }: SortableTaskProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: `${columnId}:${task._id}`,
        data: {
            type: 'task',
            task,
            columnId,
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

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

        return timeLeft;
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High':
                return 'bg-red-500 text-white';
            case 'Normal':
                return 'bg-yellow-500 text-black';
            case 'Low':
                return 'bg-green-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Card
                className='m-3  p-4 border shadow-md rounded-md overflow-hidden bg-background'
                style={{
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                }}
            >
                <div className='flex flex-wrap gap-1 m-2'>
                    {task.tags && task.tags.map((tag) => (
                        <span key={tag._id} className='text-xs font-medium bg-gray-200 text-gray-700 px-1 rounded-full'>
                            {'#' + tag.name}
                        </span>
                    ))}
                </div>
                <div className='flex flex-col space-y-2'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-lg font-bold'>
                            {task.title}
                        </h2>
                        <div className="flex gap-2 items-center">

                            <div className='flex items-center'>
                                <span className={`mr-2 text-xs font-medium px-2 rounded-full ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                </span>
                            </div>
                            <Menubar>
                                <Menu>

                                    <MenubarTrigger>
                                        <SlOptionsVertical />
                                    </MenubarTrigger>
                                    <MenubarContent>

                                        <MenubarItem>
                                            Edit

                                        </MenubarItem>
                                        <MenubarItem>

                                            Delete
                                        </MenubarItem>
                                    </MenubarContent>
                                </Menu>

                            </Menubar>
                        </div>



                    </div>
                    <p className='text-sm text-muted-foreground ounded-md overflow-hidden'>
                        {task.description}
                    </p>
                    <div className='flex items-center justify-between'>
                        {task.dueDate && (
                            <div className='bg-gray-200 text-gray-700 p-1 rounded-md flex items-center gap-1 text-sm'>
                                <IoMdCalendar size={16} />
                                {' ' + formatDueDate(task.dueDate)}
                            </div>
                        )}
                        {task.assignees && (
                            <div className='flex items-center space-x-2'>
                                {task.assignees.map((assignee) => (
                                    <span key={assignee._id} className='inline-flex items-center justify-center h-7 w-7 bg-primary text-white font-bold rounded-full uppercase'>
                                        {assignee.name.charAt(0)}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SortableTask;