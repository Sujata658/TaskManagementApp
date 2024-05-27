import GreetNav from "@/Components/Home/GreetNav"
import HomeSheet from "@/Components/SideSheet/Sheets"
import TaskSummary from "@/Components/Home/TaskSummary"
import Tasks from "@/Components/Home/Tasks"

export const Home = () => {
  return (
    <>
      <div className="flex h-screen">
        <div className="w-[20%]">
          <HomeSheet />
        </div>
        <div className="w-full">
          
          <GreetNav/>
          <TaskSummary/>
          <Tasks/>
        </div>

       
      </div>

    </>
  )
}
