import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import moment from "moment";
import TagInput from "../../General/TagInput";
import AssigneeInput from "../../General/AssigneeInput";
import { updateTask } from "@/apis/tasks/updateTask";
import { Task, TaskProps } from "@/types/Task";
import { useTask } from "@/context/TaskContext";
import TagProvider, { useTag } from "@/context/TagContext";
import { toast, Toaster } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useStatus } from "@/context/StatusContext";

interface EditTaskFormProps {
  task: Task;
  onCancel: () => void;
}

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  tags: z.array(z.string()).optional(),
  assignees: z.array(z.object({ id: z.string(), displayName: z.string() })).optional(),
  priority: z.string().optional(),
  status: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const { refreshTasks } = useTask();
  const { refreshStatus } = useStatus();
  const { refreshTags } = useTag();

  useEffect(() => {
    setValue('title', task.title);
    setValue('description', task.description);
    setValue('dueDate', moment(task.dueDate).format('YYYY-MM-DD'));
    setValue('tags', task.tags?.map(tag => tag.name));
    setValue('assignees', task.assignees?.map(() => ({ id: string, displayName: '' })));
    setValue('priority', task.priority);
    setValue('status', task.status);
  }, [task, setValue]);

  const onSubmit: SubmitHandler<FormSchema> = async (data: Partial<Task>) => {
    try {
      const formattedDueDate = data.dueDate ? moment(data.dueDate).toISOString() : undefined;

      const updatedTask: Task = {
        ...task,
        title: data.title ?? task.title,
        description: data.description ?? task.description,
        dueDate: formattedDueDate ?? task.dueDate,
        tags: (data.tags || []).map(tag => ({
          _id: tag,
          name: tag,
          tasks: [],
          createdAt: '',
          updatedAt: '',
          __v: 0,
        })),
        assignees: (data.assignees || []).map(assignee => assignee._id),
        priority: data.priority ?? task.priority,
        status: data.status ?? task.status,
      };
      const response = await updateTask(task._id,updatedTask);
      if (response.status === 200) {
        refreshTasks();
        refreshStatus();
        refreshTags();
        toast.success('Task updated successfully');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update task');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-background border rounded-lg shadow-md flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <Input className="mt-1 block border-gray-500 rounded-md" placeholder="Task title" {...register("title")} />
          {errors.title && <span className="text-red-600 text-sm">{errors.title.message}</span>}
        </div>

        {/* Priority, Due Date, Status fields go here */}

        <div>
          <AssigneeInput selectedAssignees={task.assignees.map(assignee => ({ id: assignee, displayName: '' }))} setSelectedAssignees={() => {}} />
        </div>

        <div>
          <TagProvider>
            <TagInput selectedTags={task.tags.map(tag => tag.name)} setSelectedTags={() => {}} />
          </TagProvider>
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <Textarea className="mt-1 block border-gray-500 rounded-md" placeholder="Task description" {...register("description")} />
          {errors.description && <span className="text-red-600 text-sm">{errors.description.message}</span>}
        </div>

        <div className="flex justify-between">
          <Button type="submit" className="w-1/2 bg-primary text-white py-2 px-4 rounded-md">Update Task</Button>
          <Button type="button" className="w-1/2 bg-gray-300 text-gray-700 py-2 px-4 rounded-md" onClick={onCancel}>Cancel</Button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default EditTaskForm;
