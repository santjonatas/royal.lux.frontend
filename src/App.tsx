import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <Routes> {/* 🔹 Define um conjunto de rotas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />  

      <Route path="/dashboard" element={<Dashboard />} />  
    </Routes>
  );
}

export default App;
