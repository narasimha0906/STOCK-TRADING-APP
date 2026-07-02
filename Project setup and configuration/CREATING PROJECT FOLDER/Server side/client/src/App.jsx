import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Dashboard from "./components/Dashboard.jsx";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("sb_token"));

  const handleAuth = (t) => {
    localStorage.setItem("sb_token", t);
    setToken(t);
  };

  const handleLogout = () => {
    localStorage.removeItem("sb_token");
    setToken(null);
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={!token ? <Login onAuth={handleAuth} /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!token ? <Register onAuth={handleAuth} /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={token ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}
