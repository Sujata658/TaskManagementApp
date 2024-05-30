import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './Pages/Home'
import { Login } from './Pages/Auth/Login'
import { Signup } from './Pages/Auth/Signup'
import OTP from './Pages/Auth/OTP'
import Activities from './Pages/Activities'
import BoardView from './Pages/BoardView'
import ListView from './Pages/ListView'
import { useUser } from './context/UserContext'
import HomeSheet from './Components/SideSheet/Sheets'
import GreetNav from './Components/Home/GreetNav'

function App() {
  const { user } = useUser()
  return (
    <div className='font-dmsans'>
      {user ? <>
        <div className='grid grid-cols-5'>

          <div className='col-span-1'>
            <HomeSheet />
          </div>
          <div className='col-span-4'>
            <div>
              <GreetNav />
            </div>
            <div>

              <Routes>
                <Route path="/login" element={<Navigate to="/" />} />
                <Route path='/signup' element={<Navigate to="/" />} />
                <Route path='/verify/:otp/:email' element={<Navigate to="/" />} />

                <Route path='/' element={<Home />} />
                <Route path="/activities" element={<Activities />} />
                


                  <Route path="/board" element={<BoardView />} />
                  <Route path="/list" element={<ListView />} />
               
                <Route path='*' element={<div>404</div>} />
              </Routes>
            </div>

          </div>
        </div>
      </>
        :
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/verify/:otp/:email' element={<OTP />} />
          <Route path='*' element={<Navigate to="/login" />} />
        </Routes>
      }
    </div>
  )
}

export default App
