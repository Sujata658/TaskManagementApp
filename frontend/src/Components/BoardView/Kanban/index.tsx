import KanbanColumn from "../KanbanColumn";
import { useStatus } from "@/context/StatusContext";
import { Column } from "@/types/KanbanColumn";
import { DndContext, closestCorners, DragOverlay, DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Task } from "@/types/Task";
import { arrayMove } from "@dnd-kit/sortable";
import { changeStatus } from "@/apis/tasks/changeStatus";
import { Toaster, toast } from "sonner";
import { useTask } from "@/context/TaskContext";

const Kanban = () => {
    const { ToDOtasks, InProgresstasks, Completedtasks, refreshStatus } = useStatus();

    const [todo, setTodo] = useState<Task[]>(ToDOtasks);
    const [inprogress, setInprogress] = useState<Task[]>(InProgresstasks);
    const [completed, setCompleted] = useState<Task[]>(Completedtasks);


    const {refreshTasks} = useTask();

    useEffect(() => {
        refreshStatus();
    },[])

    useEffect(() => {
        setTodo(ToDOtasks);
        setInprogress(InProgresstasks);
        setCompleted(Completedtasks);
    }, [ToDOtasks, InProgresstasks, Completedtasks]);

    const initialColumns: Column[] = [
        { id: 'ToDo', title: 'To Do', tasks: todo },
        { id: 'InProgress', title: 'In Progress', tasks: inprogress },
        { id: 'Completed', title: 'Completed', tasks: completed },
    ];

    const [columns, setColumns] = useState<Column[]>(initialColumns);
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const { task } = active.data.current as { task: Task };
        setActiveTask(task);
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const [activeColumnId, activeTaskId] = active.id.toString().split(':');
        const [overColumnId, overTaskId] = over.id.toString().split(':');

        if (activeColumnId === overColumnId && activeTaskId !== overTaskId) {
            setColumns((columns) => {
                const columnIndex = columns.findIndex(column => column.id === activeColumnId);
                if (columnIndex === -1) return columns;

                const column = columns[columnIndex];
                const activeTaskIndex = column.tasks.findIndex(task => task._id === activeTaskId);
                const overTaskIndex = column.tasks.findIndex(task => task._id === overTaskId);

                column.tasks = arrayMove(column.tasks, activeTaskIndex, overTaskIndex);

                const updatedColumns = [...columns];
                updatedColumns[columnIndex] = column;

                return updatedColumns;
            });
        }

        if (activeColumnId !== overColumnId) {
            try {
                await changeStatus(activeTaskId, activeColumnId, overColumnId);

                setColumns((columns) => {
                    const activeColumnIndex = columns.findIndex(column => column.id === activeColumnId);
                    const overColumnIndex = columns.findIndex(column => column.id === overColumnId);

                    if (activeColumnIndex === -1 || overColumnIndex === -1) return columns;

                    const activeColumn = columns[activeColumnIndex];
                    const overColumn = columns[overColumnIndex];

                    const activeTaskIndex = activeColumn.tasks.findIndex(task => task._id === activeTaskId);

                    if (activeTaskIndex === -1) return columns;

                    const [movedTask] = activeColumn.tasks.splice(activeTaskIndex, 1);
                    overColumn.tasks.push(movedTask);

                    const updatedColumns = [...columns];
                    updatedColumns[activeColumnIndex] = activeColumn;
                    updatedColumns[overColumnIndex] = overColumn;

                    return updatedColumns;
                });
                refreshTasks();
                refreshStatus();

                toast.success("Task status changed successfully.");
            } catch (error) {
                toast.error("Failed to change status. Please check settings and try again.");
            }
        }

        setActiveTask(null);
    };

    return (
        <DndContext
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="grid grid-cols-3 m-8 mt-12 gap-4">
                {columns.map(column => (
                    <KanbanColumn key={column.id} column={column} />
                ))}
            </div>
            <DragOverlay>
                {activeTask && (
                    <Card className="card m-2 p-2 border">
                        <h2 className="text-lg font-semibold">{activeTask.title}</h2>
                        <p>{activeTask.description}</p>
                    </Card>
                )}
            </DragOverlay>
            <Toaster />
        </DndContext>
    );
};

export default Kanban;
