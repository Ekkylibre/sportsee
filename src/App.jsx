import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Error from "./pages/error/Error";

function App() {
  return <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/dashboard/:id" element={<Dashboard />}/>
    <Route path="*" element={<Error />}/>
  </Routes>
}

export default App
