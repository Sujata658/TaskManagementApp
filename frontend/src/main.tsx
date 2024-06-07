import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UserProvider } from './context/UserContext.tsx'
import TaskProvider from './context/TaskContext.tsx'
import StatusProvider from './context/StatusContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from './components/ui/sonner.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
      <TaskProvider>
        <StatusProvider>

          <App />
          <Toaster richColors/>
        </StatusProvider>
      </TaskProvider>
    </UserProvider>
    
    </BrowserRouter>
     
          
  </React.StrictMode>,
)
