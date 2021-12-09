import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import "./main.css"
import Wish from "./pages/Wish"
import Result from "./pages/Result";

function App(){
  return(
    <Router>
    <Routes>
      <Route path="/" element={<Wish />} />
      <Route path="/wish" element={<Wish />} />
      <Route path="results/:id" element={<Result />} />
    </Routes>
  </Router> 
  )
}

export default App;
