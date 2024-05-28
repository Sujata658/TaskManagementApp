import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskProps } from "@/types/Task";
import { createTask } from "@/apis/tasks/createTask";

// Function to get the default date
const getDefaultDate = () => {
  const now = new Date();
  now.setDate(now.getDate() + 1);
  return now;
};

// Define the schema using Zod
const formSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  description: z.string({ required_error: "Description is required" }),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  tags: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(",").map((tag) => tag.trim()) : [])),
  assignees: z
    .string()
    .optional()
    .transform((val) => (val ? val.split(",").map((assignee) => assignee.trim()) : [])),
  color: z.string().optional(),
  priority: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const CreateTaskForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    try {
      const taskProps: TaskProps = {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        tags: (data.tags || []).map(tag => ({ _id: tag, name: tag, tasks: [] })),
        assignees: data.assignees || [],
        color: data.color,
        priority: data.priority,
      };
  
      const response = await createTask(taskProps);
      if (response.status === 200) {
        console.log('Task created successfully');
      }
      console.log(taskProps);
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
              defaultValue={getDefaultDate().toISOString().split("T")[0]}
              {...register("dueDate")}
            />
            {errors.dueDate && <span className="text-red-600 text-sm">{errors.dueDate.message}</span>}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">Color</label>
            <Input className="mt-1 block w-full border-gray-600 rounded-md" placeholder="#hex" {...register("color")} />
          </div>
        </div>

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
          <label className="block text-sm font-medium">Assignees</label>
          <Input className="mt-1 block w-full border-gray-600 rounded-md" placeholder="Assignees (comma separated)" {...register("assignees")} />
        </div>

        <div>
          <label className="block text-sm font-medium">Tags</label>
          <Input className="mt-1 block w-full border-gray-600 rounded-md" placeholder="Tags (comma separated)" {...register("tags")} />
        </div>

        <Button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md">Add Task</Button>
      </form>
    </div>
  );
};

export default CreateTaskForm;
