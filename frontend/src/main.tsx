import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext.tsx'
import TaskProvider from './context/TaskContext.tsx'
import TagProvider from './context/TagContext.tsx'
import StatusProvider from './context/StatusContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <TaskProvider>
          <TagProvider>
          <StatusProvider>
          <App />
          </StatusProvider>
          </TagProvider>
        </TaskProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
