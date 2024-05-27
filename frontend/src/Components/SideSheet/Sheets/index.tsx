import Links from "../Links"
import logo from '../../../assets/undraw_donut_love_kau1.svg'
import CreateTaskCard from "../CreateTask"

const HomeSheet = () => {
  return (
    <>
      <div className="bg-background h-full p-12 border-r flex flex-col items-start gap-8">
        <div className="mb-8">
          <a href='/'>
            <div className='flex gap-4 items-center'>
              <img src={logo} alt="logo" className="h-12"/>
              <div className='text-lg font-bold'>TaskIt</div>
            </div>
          </a>
        </div>
        <CreateTaskCard/>
        <Links />
      </div>
    </>


  )
}

export default HomeSheet
