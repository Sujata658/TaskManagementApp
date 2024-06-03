import { Card } from '@/components/ui/card';
import { KanbanColumnProps } from '@/types/KanbanColumn';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableTask from '../SortableTask';
import { useDroppable } from '@dnd-kit/core';

const KanbanColumn = ({ column }: KanbanColumnProps) => {
    const taskIds = column.tasks.map((task) => `${column.id}:${task._id}`);
    const { setNodeRef } = useDroppable({
        id: column.id,
    });

    return (
        <Card ref={setNodeRef} className="h-[500px] m-2 p-2 w-[300px]">
            <div className='p-2 border'>
                <h1 className='text-lg font-semibold'>{column.title}</h1>
            </div>
            <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
                {column.tasks.map((task) => (
                    <SortableTask key={task._id} task={task} columnId={column.id} />
                ))}
            </SortableContext>
        </Card>
    );
};

export default KanbanColumn;
