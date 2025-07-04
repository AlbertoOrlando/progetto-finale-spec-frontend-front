import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom"
import Device from "./pages/Device"
import DevicesList from "./pages/DevicesList"
import { GlobalProvider } from "./context/GlobalContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import { faBalanceScale, faHeart } from "@fortawesome/free-solid-svg-icons";
import Compare from "./pages/Compare";
import Favorites from "./pages/Favorites";


function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <nav className="navbar">
          <div>
            <NavLink to="/">
              <FontAwesomeIcon icon={faApple} />
            </NavLink>
          </div>
          <div>
            <NavLink to="/compare">
              <FontAwesomeIcon icon={faBalanceScale} />
            </NavLink>
            <NavLink to="/favorites">
              <FontAwesomeIcon icon={faHeart} />
            </NavLink>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<DevicesList />} />
          <Route path="/device/:id" element={<Device />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<h1>Pagina non trovata</h1>} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
