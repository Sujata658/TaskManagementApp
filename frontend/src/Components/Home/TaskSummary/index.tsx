import { Card } from "@/components/ui/card";
import { overviews } from "../../SideSheet/const";

const TaskSummary = () => {
    return (
        <div className="m-8">
            
            <div className="grid grid-cols-4 gap-4">
                {overviews.map((overview) => (
                    <Card
                        key={overview.id}
                        className="w-full p-2 transition-transform transform hover:scale-105 hover:cursor-pointer"
                    >
                        <div className="flex items-center justify-between p-4  ">
                            <div className="flex items-center">
                                {<overview.icon className="text-2xl" />}
                                <div className="ml-4">
                                <p className="text-lg font-bold ">{overview.title}</p>
                                <p className="text-sm text-green-800 font-semibold">{overview.total}</p>

                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default TaskSummary;
