import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Alerts from "./pages/Alerts";
import Simulator from "./pages/Simulator";
import Layout from "./components/Layout";

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