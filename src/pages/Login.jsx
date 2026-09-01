import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login({ setToken }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

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
    }
  }

  return (
    <div>
      <h1>CyberGuard</h1>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;