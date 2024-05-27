import { Card } from "@/components/ui/card";
import { FaPlus } from "react-icons/fa";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Create Task</SheetTitle>
                        <SheetDescription>
                            Please add a title and description to add the task.
                        </SheetDescription>
                    </SheetHeader>
                    <CreateTaskForm/>
                    {/* <div className="p-4">
                        <Label>Title</Label>
                        <Input placeholder="Task title" />
                    </div>
                    <div className="p-4">
                        <Label>Description</Label>
                        <Input placeholder="Task description" />
                    </div>

                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                        </SheetClose>
                    </SheetFooter> */}
                </SheetContent>
            </Sheet>

        </>
    )
}

export default CreateTaskCard
