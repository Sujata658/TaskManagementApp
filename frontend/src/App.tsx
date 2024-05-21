import { ThemeProvider } from "@/components/theme-provider"
import { Route, Routes } from "react-router-dom"
import { HomePage, LoginPage } from "./pages"
import { Navbar } from "./pages/components"

function App() {

  return (
    <>
  <div style={{width:"100%",height:"100%" ,border:"black solid 4px"}}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Routes>
          <Route path="/" Component={HomePage}></Route>
          <Route path="/login" Component={LoginPage}></Route>
        </Routes>
      </ThemeProvider>
    </div>
    </>
  )
}

export default App
