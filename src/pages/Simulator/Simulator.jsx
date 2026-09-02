import { useState } from "react";
import api from "../../services/api";
import "./Simulator.css";

function Simulator() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");

  async function simulate(endpoint) {
    try {
      setLoading(endpoint);
      setMessage("");

      const response = await api.post(`/simulator/${endpoint}`);

      setMessage(response.data);
    } catch (error) {
      console.error("Erro na simulação:", error);
      setMessage("Erro ao executar simulação");
    } finally {
      setLoading("");
    }
  }

  return (
    <div className="simulator-page">

      <div className="page-header">
        <h1>Simulador</h1>
        <p>
          Gere eventos de segurança para testar as regras de detecção
          do CyberGuard.
        </p>
      </div>

      <div className="simulator-grid">

        <div className="simulation-card">
          <h2>Brute Force</h2>

          <p>
            Simula múltiplas tentativas de login com falha para o mesmo
            usuário e IP.
          </p>

          <button
            onClick={() => simulate("brute-force")}
            disabled={loading === "brute-force"}
          >
            {loading === "brute-force"
              ? "Simulando..."
              : "Executar simulação"}
          </button>
        </div>

        <div className="simulation-card">
          <h2>Password Spraying</h2>

          <p>
            Simula tentativas de login em diferentes contas utilizando
            o mesmo endereço IP.
          </p>

          <button
            onClick={() => simulate("password-spraying")}
            disabled={loading === "password-spraying"}
          >
            {loading === "password-spraying"
              ? "Simulando..."
              : "Executar simulação"}
          </button>
        </div>

        <div className="simulation-card">
          <h2>Account Compromise</h2>

          <p>
            Simula várias falhas de autenticação seguidas por um login
            bem-sucedido.
          </p>

          <button
            onClick={() => simulate("account-compromise")}
            disabled={loading === "account-compromise"}
          >
            {loading === "account-compromise"
              ? "Simulando..."
              : "Executar simulação"}
          </button>
        </div>

      </div>

      {message && (
        <div className="simulation-message">
          {message}
        </div>
      )}

    </div>
  );
}

export default Simulator;