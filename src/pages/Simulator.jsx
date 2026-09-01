import { useState } from "react";
import api from "../services/api";

function Simulator() {
  const [message, setMessage] = useState("");

  async function simulate(endpoint) {
    try {
      const response = await api.post(`/simulator/${endpoint}`);

      setMessage(response.data);
    } catch (error) {
      console.error("Erro na simulação:", error);
      setMessage("Erro ao executar simulação");
    }
  }

  return (
    <div>
      <h1>Simulador</h1>

      <p>
        Gere eventos de segurança para testar as regras de detecção.
      </p>

      <button onClick={() => simulate("brute-force")}>
        Simular Brute Force
      </button>

      <button onClick={() => simulate("password-spraying")}>
        Simular Password Spraying
      </button>

      <button onClick={() => simulate("account-compromise")}>
        Simular Account Compromise
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Simulator;