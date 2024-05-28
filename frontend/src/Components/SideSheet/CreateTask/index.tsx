import { Card } from "@/components/ui/card";
import { FaPlus } from "react-icons/fa";
import { Sheet,  SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import CreateTaskForm from "../CreateTaskForm";



const CreateTaskCard = () => {

    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Card className="bg-background  rounded-xl p-4 hover:cursor-pointer">
                        <div className="flex items-center justify-center gap-4 p-0">
                            <div>
                                <div className="text-sm font-bold">New Task</div>
                            </div>
                            <div className="bg-background border border-foreground p-4 rounded-full" >
                                <FaPlus />
                            </div>
                        </div>
                    </Card>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Create Task</SheetTitle>
                        <SheetDescription>
                            Please add a title and description to the task.
                        </SheetDescription>
                    </SheetHeader>
                        
                    <CreateTaskForm/>

                    
                </SheetContent>
            </Sheet>

        </>
    )
}

export default CreateTaskCard
