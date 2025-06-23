import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom"
import Device from "./pages/Device"
import DevicesList from "./pages/DevicesList"


function App() {
  return (
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
  )
}

export default App
