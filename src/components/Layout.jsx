import { Link, Outlet, useNavigate } from "react-router-dom";

function Layout({ setToken }) {

  const navigate = useNavigate();

  function handleLogout() {

    localStorage.removeItem("token");

    setToken(null);

    navigate("/login");
  }

  return (
    <div>

      <nav>

        <h2>CyberGuard</h2>

        <Link to="/dashboard">
          Dashboard
        </Link>

        {" | "}

        <Link to="/events">
          Eventos
        </Link>

        {" | "}

        <Link to="/alerts">
          Alertas
        </Link>

        {" | "}

        <Link to="/simulator">
          Simulador
        </Link>

        {" | "}

        <button onClick={handleLogout}>
          Logout
        </button>

      </nav>

      <hr />

      <main>
        <Outlet />
      </main>

    </div>
  );
}

export default Layout;