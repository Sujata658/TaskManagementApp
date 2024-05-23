import { Route, Routes } from 'react-router-dom'
import './App.css'
// import { Home } from './Pages/Home'
import { Login } from './Pages/Login'
import { Signup } from './Pages/Signup'

function App() {

  return (
    <>
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path='/' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      
    </Routes>

    </>
  )
}

export default App
