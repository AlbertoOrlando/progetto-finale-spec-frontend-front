import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom"
import Device from "./pages/Device"
import DevicesList from "./pages/DevicesList"
import { GlobalProvider } from "./context/GlobalContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBalanceScale } from "@fortawesome/free-solid-svg-icons";
import Compare from "./pages/Compare";
import Favorites from "./pages/Favorites";


function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <nav>
          <div>
            <NavLink to="/">
              Lista prodotti
            </NavLink>
          </div>
          <div>
            <NavLink to="/compare">
              <FontAwesomeIcon icon={faBalanceScale} />
            </NavLink>
            <NavLink to="/favorites">
              Preferiti
            </NavLink>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<DevicesList />} />
          <Route path="/:id" element={<Device />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/Favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
