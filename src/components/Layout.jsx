import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Layout.css";

function Layout({ setToken }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  return (
    <div className="app-layout">

      <aside className="sidebar">
        <h2 className="logo">CyberGuard</h2>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard">
            Dashboard
          </NavLink>

          <NavLink to="/events">
            Eventos
          </NavLink>

          <NavLink to="/alerts">
            Alertas
          </NavLink>

          <NavLink to="/simulator">
            Simulador
          </NavLink>
        </nav>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>

    </div>
  );
}

export default Layout;