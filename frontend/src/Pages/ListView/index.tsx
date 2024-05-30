import { DataTable } from "@/Components/General/DataTable";
import { useTask } from "@/context/TaskContext";
import { columns } from "./const";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Task } from "@/types/Task";
import { getTasksByTag } from "@/apis/tags/getTasksByTag";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useStatus } from "@/context/StatusContext";


const ListView = () => {
  const [query, setQuery] = useState<string>("");
  const { tasks } = useTask();
  const [newTasks, setNewTasks] = useState<Task[]>(tasks);

  // const { ToDOtasks, InProgresstasks, Completedtasks, refreshTasks} = useStatus()

  useEffect(() => {
    try {
      getTasksByTag(query).then((response) => {
        setNewTasks(response);
      });
    } catch (error) {
      throw error;
    }
  }, [query, tasks]);

  return (
    <>
      <Tabs defaultValue="ToDo" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="ToDo">To Do</TabsTrigger>
          <TabsTrigger value="InProgress">In Progress</TabsTrigger>
          <TabsTrigger value="Completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="ToDo">Make changes to your account here.</TabsContent>
        <TabsContent value="InProgress">Change your password here.</TabsContent>
        <TabsContent value="Completed">Change your password here.</TabsContent>
      </Tabs>
      <div className="mx-4 space-y-4">
        <Input
          placeholder="Search by tags"
          className="w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="h-[70vh] overflow-y-auto">
          <DataTable columns={columns} data={newTasks} />
        </div>
      </div>
    </>
  );
};

export default ListView;
