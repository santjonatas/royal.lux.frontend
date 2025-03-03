import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <Routes> {/* 🔹 Define um conjunto de rotas */}
      {/* ROTAS LIVRES */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />  

      {/* ROTAS PROTEGIDAS */}
      <Route path="/dashboard" element={<Dashboard />} /> 
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
