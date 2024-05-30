import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import moment from "moment"; // Import Moment.js
import TagInput from "../../General/TagInput";
import AssigneeInput from "../../General/AssigneeInput"; 
import { createTask } from "@/apis/tasks/createTask";
import { TaskProps } from "@/types/Task";
import { useTask } from "@/context/TaskContext";
import { useTag } from "@/context/TagContext";
import { toast, Toaster } from "sonner";

// Function to get the default date
const getDefaultDate = () => {
  return moment().add(1, 'day').format('YYYY-MM-DD'); // Use Moment.js to format the date
};

// Define the schema using Zod
const formSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  description: z.string({ required_error: "Description is required" }),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  tags: z.array(z.string()).optional(),
  assignees: z.array(z.object({ id: z.string(), displayName: z.string() })).optional(),
  // color: z.string().optional(),
  priority: z.string().optional(),
  status: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const CreateTaskForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dueDate: getDefaultDate(), // Set default value for dueDate
    },
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAssignees, setSelectedAssignees] = useState<{ id: string; displayName: string }[]>([]);
  const {refreshTasks} = useTask();
  const {refreshTags} = useTag();

  useEffect(() => {
    setValue('tags', selectedTags);
    setValue('assignees', selectedAssignees);
  }, [selectedTags, selectedAssignees, setValue]);

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    try {
      const taskProps: TaskProps = {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        tags: (data.tags || []).map(tag => ({
          _id: tag,
          name: tag,
          tasks: [],
          createdAt: '',
          updatedAt: '',
          __v: 0,
        })),
        assignees: (data.assignees || []).map(assignee => assignee.id),
        // color: data.color,
        priority: data.priority,
        status: data.status,
      };

      const response = await createTask(taskProps);
      if (response.status === 200) {
        refreshTasks();
        refreshTags();
        toast.success('Task created successfully');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-background rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <Input className="mt-1 block w-full border-gray-500 rounded-md" placeholder="Task title" {...register("title")} />
          {errors.title && <span className="text-red-600 text-sm">{errors.title.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <Input className="mt-1 block w-full border-gray-600 rounded-md" placeholder="Task description" {...register("description")} />
          {errors.description && <span className="text-red-600 text-sm">{errors.description.message}</span>}
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium">Due Date</label>
            <Input
              type="date"
              className="mt-1 block w-full border-gray-600 rounded-md"
              defaultValue={getDefaultDate()} // Set default value for dueDate
              {...register("dueDate")}
            />
            {errors.dueDate && <span className="text-red-600 text-sm">{errors.dueDate.message}</span>}
          </div>
        </div>
          {/* <div className="flex-1">
            <label className="block text-sm font-medium">Color</label>
            <Input className="mt-1 block w-full border-gray-600 rounded-md" placeholder="#hex" {...register("color")} />
          </div> */}

        <div>
          <label className="block text-sm font-medium">Priority</label>
          <select
            className="mt-1 block w-full bg-background border border-gray-600 rounded-md p-2"
            {...register("priority")}
          >
            <option value="Low">Low</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            className="mt-1 block w-full bg-background border border-gray-600 rounded-md p-2"
            {...register("status")}
          >
            <option value="ToDo">To Do</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <AssigneeInput selectedAssignees={selectedAssignees} setSelectedAssignees={setSelectedAssignees} />
        </div>

        <TagInput selectedTags={selectedTags} setSelectedTags={setSelectedTags} />

        <Button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md">Add Task</Button>
      </form>
      <Toaster/>
    </div>
  );
};

export default CreateTaskForm;
