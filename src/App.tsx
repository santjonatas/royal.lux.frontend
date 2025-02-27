import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

function App() {
  return (
    <Routes> {/* 🔹 Define um conjunto de rotas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />  
    </Routes>
  );
}

export default App;
