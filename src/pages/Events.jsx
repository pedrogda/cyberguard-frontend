import { useEffect, useState } from "react";
import api from "../services/api";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function loadEvents() {
      try {
        const response = await api.get("/events");

        setEvents(response.data);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    }

    loadEvents();
  }, []);

  return (
    <div>
      <h1>Security Events</h1>

      {events.length === 0 ? (
        <p>Nenhum evento encontrado.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              {event.eventType} - {event.username} - {event.sourceIp}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Events;