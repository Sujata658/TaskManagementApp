import { Card } from "@/components/ui/card";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SortableTaskProps } from "@/types/KanbanColumn";

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

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Card className='m-2 p-2 border'>
                <h2 className='text-lg font-semibold'>{task.title}</h2>
                <p>{task.description}</p>
            </Card>
        </div>
    );
};

export default SortableTask;
