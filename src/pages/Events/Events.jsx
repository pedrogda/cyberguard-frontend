import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Events.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/events");

        setEvents(response.data);

      } catch (error) {
        console.error("Erro ao buscar eventos:", error);

        setError("Não foi possível carregar os eventos.");

      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  if (loading) {
    return <p>Carregando eventos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="events-page">
      <div className="page-header">
        <h1>Eventos</h1>
        <p>Eventos de segurança registrados pelo sistema.</p>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Usuário</th>
              <th>IP de origem</th>
              <th>Dispositivo</th>
              <th>Horário</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.eventType}</td>
                <td>{event.username}</td>
                <td>{event.sourceIp}</td>
                <td>{event.deviceName}</td>
                <td>
                  {new Date(event.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {events.length === 0 && (
          <p className="empty-message">
            Nenhum evento encontrado.
          </p>
        )}
      </div>
    </div>
  );
}

export default Events;