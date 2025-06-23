import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom"
import Device from "./pages/Device"
import DevicesList from "./pages/DevicesList"
import { GlobalProvider } from "./context/GlobalContext"


function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <nav>
          <NavLink to="/">
            Lista prodotti
          </NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<DevicesList />} />
          <Route path="/:id" element={<Device />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
