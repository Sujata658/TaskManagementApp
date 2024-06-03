import { DataTable } from "@/Components/General/DataTable";
import { columns } from "./const";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useStatus } from "@/context/StatusContext";
import { useLocation } from "react-router-dom";


const ListView = () => {
  const { ToDOtasks, InProgresstasks, Completedtasks } = useStatus();

  const location = useLocation();
  const tab = location.state ? location.state.tab : 'ToDo';
  
  return (
    <>
      <div className="mx-4 my-16 space-y-4 p-2">
        <Tabs defaultValue={tab}>
          <TabsList>
            <TabsTrigger value="ToDo">To Do</TabsTrigger>
            <TabsTrigger value="InProgress">In Progress</TabsTrigger>
            <TabsTrigger value="Completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="ToDo">
            <div >
              <div className="max-h-64 overflow-y-auto">
                <DataTable columns={columns} data={ToDOtasks} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="InProgress">
            <div >
              <div className="h-[70vh] overflow-y-auto">
                <DataTable columns={columns} data={InProgresstasks} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="Completed">
            <div >
              <div className="h-[70vh] overflow-y-auto">
                <DataTable columns={columns} data={Completedtasks} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

    </>
  );
};

export default ListView;
