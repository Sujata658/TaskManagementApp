import { getAllTasks } from "@/apis/tasks/getAllTasks";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Task } from "@/types/Task";
import { useEffect, useState } from "react";
import moment from "moment";
import 'tailwindcss/tailwind.css';
import { ScrollArea } from "@/components/ui/scroll-area";
import { HiRefresh } from "react-icons/hi";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    getAllTasks()
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        throw err;
      });
  }, [refresh]);

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
    setRefresh(!refresh)
  }

  return (
    <>
      <div className="px-8 pb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold mb-6">Tasks</h1>
            <div onClick={handleRefresh}>{<HiRefresh />}</div>
          </div>
          <div>
            <a href="/list">View All</a>
          </div>
        </div>
        <div className="bg-background shadow-md rounded-lg">
          <Table className="min-w-full ">
            <ScrollArea className="w-full h-[50vh]">
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
                {tasks.length === 0 ? <TableRow ><TableCell colSpan={4} className="text-center ">No tasks found</TableCell></TableRow> :

                  tasks.map((task) => (
                    <TableRow key={task._id} className={`bg-[${task.color}] border-b hover:bg-gray-50`}>
                      <TableCell className="px-6 py-4 text-sm font-medium text-foreground">{task.title}</TableCell>
                      <TableCell className="px-6 py-4 text-sm text-foreground ">{task.description}</TableCell>
                      <TableCell className="px-6 py-4 text-sm font-medium text-foreground">{task.author.name}</TableCell>
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
