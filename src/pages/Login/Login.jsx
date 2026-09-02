import { useState } from "react";
import api from "../../services/api";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", {
        username,
        password
      });

      const receivedToken = response.data.token;

      localStorage.setItem("token", receivedToken);
      setToken(receivedToken);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setError("Usuário ou senha inválidos.");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <h1>CyberGuard</h1>
          <p>Acesse a plataforma de monitoramento de segurança.</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">

          <div className="form-group">
            <label>Usuário</label>

            <input
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              placeholder="Digite seu usuário"
            />
          </div>

          <div className="form-group">
            <label>Senha</label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Digite sua senha"
            />
          </div>

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button type="submit">
            Entrar
          </button>

        </form>
        <p className="login-register-link">

          Não possui conta?{" "}
          <Link to="/register">
            Cadastre-se
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;