import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Events from "./pages/Events/Events";
import Alerts from "./pages/Alerts/Alerts";
import Simulator from "./pages/Simulator/Simulator";
import Layout from "./components/Layout";
import Register from "./pages/Register/Register";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  return (
    <Routes>
      <Route
        path="/login"
        element={
          token
            ? <Navigate to="/dashboard" />
            : <Login setToken={setToken} />
        }
      />
      <Route
        path="/register"
        element={
          token
            ? <Navigate to="/dashboard" />
            : <Register />
        }
      />

      <Route
        element={
          token
            ? <Layout setToken={setToken} />
            : <Navigate to="/login" />
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/simulator" element={<Simulator />} />
      </Route>

      <Route
        path="*"
        element={
          <Navigate
            to={token ? "/dashboard" : "/login"}
          />
        }
      />
    </Routes>
  );
}

export default App;