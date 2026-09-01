import { useEffect, useState } from "react";
import api from "../services/api";

function Alerts() {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        async function loadAlerts() {
            try {
                const response = await api.get("/alerts");
                setAlerts(response.data);
            } catch (error) {
                console.error("Erro ao buscar alertas:", error);
            }
        }

        loadAlerts();
    }, []);

    async function updateStatus(id, status) {
        try {
            const response = await api.patch(
                `/alerts/${id}/status`,
                {
                    status: status
                }
            );

            setAlerts((currentAlerts) =>
                currentAlerts.map((alert) =>
                    alert.id === id ? response.data : alert
                )
            );

        } catch (error) {
            console.error("Erro ao atualizar alerta:", error);
        }
    }

    return (
        <div>
            <h1>Alertas</h1>

            {alerts.length === 0 ? (
                <p>Nenhum alerta encontrado.</p>
            ) : (
                <ul>
                    {alerts.map((alert) => (
                        <li key={alert.id}>

                            <p>
                                {alert.type} - {alert.severity} - {alert.status}
                            </p>

                            {alert.username && (
                                <p>Usuário: {alert.username}</p>
                            )}

                            {alert.sourceIp && (
                                <p>IP: {alert.sourceIp}</p>
                            )}
                            <button
                                onClick={() =>
                                    updateStatus(alert.id, "OPEN")
                                }
                            >
                                Open
                            </button>

                            <button
                                onClick={() =>
                                    updateStatus(alert.id, "INVESTIGATING")
                                }
                            >
                                Investigating
                            </button>

                            <button
                                onClick={() =>
                                    updateStatus(alert.id, "RESOLVED")
                                }
                            >
                                Resolved
                            </button>

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Alerts;