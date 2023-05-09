import { BrowserRouter, Route, Routes } from "react-router-dom"
import CrossWordGenerator from "./components/CrossWordGenerator"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CrossWordGenerator />} />
      </Routes>
    </BrowserRouter>    
  )
}

export default App
