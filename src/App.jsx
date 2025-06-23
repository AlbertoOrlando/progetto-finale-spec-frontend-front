import { BrowserRouter, Route, Routes, } from "react-router-dom"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
