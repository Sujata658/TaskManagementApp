import { getAllTasks } from "@/apis/tasks/getAllTasks";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Task } from "@/types/Task";
import { useEffect, useState } from "react";
import moment from "moment";
import 'tailwindcss/tailwind.css';
import { ScrollArea } from "@/components/ui/scroll-area";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getAllTasks()
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

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

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 2:
        return 'text-red-500';
      case 1:
        return 'text-yellow-500';
      case 0:
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

  return (
    <>
      <div className="px-8 pb-8">
        <h1 className="text-3xl font-bold mb-6">Tasks</h1>
        <div className="bg-background shadow-md rounded-lg">
          <Table className="min-w-full ">
            <ScrollArea className="w-full h-[50vh]">
              <TableHeader className="bg-secondary">
                <TableRow>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-secondary-foreground uppercase tracking-wider">Title</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-secondary-foreground uppercase tracking-wider">Description</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-secondary-foreground uppercase tracking-wider">Priority</TableHead>
                  <TableHead className="px-6 py-3 text-right text-xs font-medium text-secondary-foreground uppercase tracking-wider">Due Date</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>

                {tasks.map((task) => (
                  <TableRow key={task._id} className="bg-background border-b hover:bg-gray-50">
                    <TableCell className="px-6 py-4 text-sm font-medium text-foreground">{task.title}</TableCell>
                    <TableCell className="px-6 py-4 text-sm text-foreground ">{task.description}</TableCell>
                    <TableCell className={`px-6 py-4 text-sm font-medium ${getPriorityColor(task.priority)}`}>{task.priority}</TableCell>
                    <TableCell className={`px-6 py-4 whitespace-nowrap text-sm text-right ${getDueDateColor(task.duedate)}`}>{formatDueDate(task.duedate)}</TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </ScrollArea>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Tasks;
