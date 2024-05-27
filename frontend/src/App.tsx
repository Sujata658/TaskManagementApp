import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './Pages/Home'
import { Login } from './Pages/Auth/Login'
import { Signup } from './Pages/Auth/Signup'
import OTP from './Pages/Auth/OTP'
import Activities from './Pages/Activities'
import BoardView from './Pages/BoardView'
import ListView from './Pages/ListView'

function App() {

  return (
    <>
    <div className='font-dmsans'>

    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path='/' element={<Home/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/verify/:otp/:email' element={<OTP/>} />

      <Route path="/activities" element={<Activities/>} />
      <Route path="/board" element={<BoardView/>} />
      <Route path="/list" element={<ListView/>} />

      <Route path='*' element={<div>404</div>} />
      
    </Routes>
    </div>

    </>
  )
}

export default App
