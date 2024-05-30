import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import moment from "moment";
import 'tailwindcss/tailwind.css';
import { HiRefresh } from "react-icons/hi";
import { useTask } from "@/context/TaskContext";
import { Task } from "@/types/Task";
import { toast, Toaster } from "sonner";

const Tasks = () => {
  const {tasks, refreshTasks} = useTask();


  const formatDueDate = (duedate: string) => {
    const now = moment();
    const due = moment(duedate);
    const duration = moment.duration(due.diff(now));

    if (duration.asDays() < 1) {
      return 'Today';
    } else if (duration.asDays() < 2) {
      return 'Tomorrow';
    } else if (duration.asDays() < 7) {
      return due.fromNow();
    } else if (duration.asDays() < 14) {
      return `In ${Math.ceil(duration.asDays())} days`;
    } else if (duration.asWeeks() < 4) {
      return due.fromNow();
    } else {
      return due.format("MMM DD, YYYY");
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-500';
      case 'Normal':
        return 'text-yellow-500';
      case 'Low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getDueDateColor = (duedate: string) => {
    const now = moment();
    const due = moment(duedate);
    return due.isBefore(now) ? 'text-red-500' : 'text-gray-700';
  };

  const handleRefresh = () => {
    refreshTasks();
    toast.success('Tasks refreshed');
  };

  return (
    <>
      <div className="px-8 pb-8">
        <div className="flex justify-between items-center h-full mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">Tasks</h1>
            <div onClick={handleRefresh} className="cursor-pointer"><HiRefresh /></div>
          </div>
          <div>
            <a href="/list">View All</a>
          </div>
        </div>

        <div className="bg-background shadow-md rounded-lg">
          <div className="overflow-y-auto max-h-[50vh]">
            <Table className="min-w-full">
              <TableHeader className="bg-secondary">
                <TableRow>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-secondary-foreground uppercase tracking-wider">Title</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-secondary-foreground uppercase tracking-wider">Description</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-secondary-foreground uppercase tracking-wider">Created By</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-secondary-foreground uppercase tracking-wider">Priority</TableHead>
                  <TableHead className="px-6 py-3 text-right text-xs font-medium text-secondary-foreground uppercase tracking-wider">Due Date</TableHead>
                </TableRow>
              </TableHeader>
              
              <TableBody>
                {
                  !tasks || tasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">No tasks found</TableCell>
                  </TableRow>
                ) : (
                  tasks.map((task: Task) => (
                    <TableRow key={task._id} className={`bg-background border-b hover:bg-gray-50`}>
                      <TableCell className="px-6 py-4 text-sm font-medium text-foreground hover:text-foreground">{task.title}</TableCell>
                      <TableCell className="px-6 py-4 text-sm text-foreground hover:text-foreground">{task.description}</TableCell>
                      <TableCell className="px-6 py-4 text-sm font-medium text-foreground hover:text-foreground">{task.author.name}</TableCell>
                      <TableCell className={`px-6 py-4 text-sm font-medium ${getPriorityColor(task.priority)}`}>{task.priority}</TableCell>
                      <TableCell className={`px-6 py-4 whitespace-nowrap text-sm text-right ${getDueDateColor(task.duedate)}`}>{formatDueDate(task.duedate)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <Toaster/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tasks;
