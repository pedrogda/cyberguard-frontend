import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Alerts.css";

function Alerts() {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadAlerts() {
            try {
                setLoading(true);
                setError("");

                const response = await api.get("/alerts");

                setAlerts(response.data);

            } catch (error) {
                console.error("Erro ao buscar alertas:", error);

                setError("Não foi possível carregar os alertas.");

            } finally {
                setLoading(false);
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

    if (loading) {
        return <p>Carregando alertas...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="alerts-page">
            <div className="page-header">
                <h1>Alertas</h1>
                <p>Alertas de segurança detectados pelo sistema.</p>
            </div>

            <div className="table-container">
                <table className="alerts-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tipo</th>
                            <th>Severidade</th>
                            <th>Status</th>
                            <th>Usuário</th>
                            <th>IP</th>
                            <th>Criado em</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {alerts.map((alert) => (
                            <tr key={alert.id}>
                                <td>{alert.id}</td>

                                <td>{alert.type}</td>

                                <td>
                                    <span
                                        className={`badge severity-${alert.severity.toLowerCase()}`}
                                    >
                                        {alert.severity}
                                    </span>
                                </td>

                                <td>
                                    <span
                                        className={`badge status-${alert.status.toLowerCase()}`}
                                    >
                                        {alert.status}
                                    </span>
                                </td>

                                <td>{alert.username || "-"}</td>

                                <td>{alert.sourceIp || "-"}</td>

                                <td>
                                    {new Date(alert.createdAt).toLocaleString()}
                                </td>

                                <td className="actions">
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {alerts.length === 0 && (
                    <p className="empty-message">
                        Nenhum alerta encontrado.
                    </p>
                )}
            </div>
        </div>
    );
}

export default Alerts;