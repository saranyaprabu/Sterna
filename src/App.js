import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Location from "./Components/Location";
import Sidebar from "./Components/Sidebar";

function App() {
  const { user } = useSelector((state) => state.auth); // ✅ Get user from Redux

  const isAuthenticated = !!user;

  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route
  path="/"
  element={
    isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
  }
/>
<Route
  path="/login"
  element={
    isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
  }
/>


        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <div style={{ display: "flex" }}>
                <Sidebar />
                <Dashboard />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Location */}
        <Route
          path="/location"
          element={
            isAuthenticated ? (
              <div style={{ display: "flex" }}>
                <Sidebar />
                <Location />  
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
