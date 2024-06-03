import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './Pages/Home'
import { Login } from './Pages/Auth/Login'
import { Signup } from './Pages/Auth/Signup'
import OTP from './Pages/Auth/OTP'
import Activities from './Pages/Activities'
import BoardView from './Pages/BoardView'
import ListView from './Pages/ListView'
import Protected from './Components/Protected'


function App() {
  return (

    <div className='font-geologica'>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path='/signup' element={<Signup />} />
                  <Route path='/verify/:otp/:email' element={<OTP />} />
                  <Route element={<Protected />}>

                    <Route path='/' element={<Home />} />
                    <Route path="/activities" element={<Activities />} />
                    <Route path="/board" element={<BoardView />} />
                    <Route path="/list" element={<ListView />} />

                    <Route path='*' element={<div>404</div>} />
                  </Route>
                </Routes>
    </div>

  )
}

export default App
