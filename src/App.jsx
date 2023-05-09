import { BrowserRouter, Route, Routes } from "react-router-dom"
import CrossWordGenerator from "./components/CrossWordGenerator"
import GenerateClues from "./components/GenerateClues"
import NoPage from "./components/NoPage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GenerateClues />} />
        <Route path="/generate" element={<CrossWordGenerator />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>    
  )
}

export default App
