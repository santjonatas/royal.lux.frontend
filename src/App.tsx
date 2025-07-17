import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import PrivateRoute from "./pages/PrivateRoute";
import ForgotMyPassword from "./pages/ForgotMyPassword/ForgotMyPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />  
      <Route path="/forgot-my-password" element={<ForgotMyPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      /> 
      <Route 
        path="/profile" 
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
}

export default App;
