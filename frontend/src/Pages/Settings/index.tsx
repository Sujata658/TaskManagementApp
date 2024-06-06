import { Card } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";

import { RxQuestionMarkCircled } from "react-icons/rx";

const taskStates = ["To Do", "In Progress", "Completed"];

const Settings = () => {
  return (
    <div className="p-8 ">
      <Card className="p-6 space-y-6 shadow-xl w-full ">
        <div className="flex gap-2">
        <div className="text-2xl font-bold ">Settings</div>
        <Popover>
            <PopoverTrigger><RxQuestionMarkCircled/></PopoverTrigger>
            <PopoverContent className="text-sm text-gray-600">Edit your workflow rules</PopoverContent>
        </Popover>

        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {taskStates.map((state, index) => (
            <Card key={state} className="p-2 shadow-md space-y-4">
              <div className="font-semibold text-lg text-center bg-primary p-2 rounded">{state}</div>
              <div className="space-y-2 m-2">
                {taskStates
                  .filter((_, i) => i !== index)
                  .map((targetState) => (
                    <div key={targetState} className="flex items-center justify-between pt-2">
                      <div className="text-sm">To {targetState}</div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <Switch></Switch>
                      </label>
                    </div>
                  ))}
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default Settings
