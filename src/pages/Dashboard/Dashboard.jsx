import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Dashboard.css";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

function Dashboard() {
    const [events, setEvents] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadDashboardData() {
            try {
                setLoading(true);
                setError("");

                const eventsResponse = await api.get("/events");
                const alertsResponse = await api.get("/alerts");

                setEvents(eventsResponse.data);
                setAlerts(alertsResponse.data);

            } catch (error) {
                console.error("Erro ao carregar dashboard:", error);

                setError("Não foi possível carregar os dados do dashboard.");

            } finally {
                setLoading(false);
            }
        }
        loadDashboardData();
    }, []);

    const openAlerts = alerts.filter(
        (alert) => alert.status === "OPEN"
    ).length;

    const criticalAlerts = alerts.filter(
        (alert) => alert.severity === "CRITICAL"
    ).length;

    const resolvedAlerts = alerts.filter(
        (alert) => alert.status === "RESOLVED"
    ).length;

    const alertsBySeverity = [
        {
            severity: "LOW",
            total: alerts.filter(
                (alert) => alert.severity === "LOW"
            ).length
        },
        {
            severity: "MEDIUM",
            total: alerts.filter(
                (alert) => alert.severity === "MEDIUM"
            ).length
        },
        {
            severity: "HIGH",
            total: alerts.filter(
                (alert) => alert.severity === "HIGH"
            ).length
        },
        {
            severity: "CRITICAL",
            total: alerts.filter(
                (alert) => alert.severity === "CRITICAL"
            ).length
        }
    ];
    const alertsByType = [
        {
            type: "BRUTE_FORCE",
            total: alerts.filter(
                (alert) => alert.type === "BRUTE_FORCE"
            ).length
        },
        {
            type: "PASSWORD_SPRAYING",
            total: alerts.filter(
                (alert) => alert.type === "PASSWORD_SPRAYING"
            ).length
        },
        {
            type: "POSSIBLE_ACCOUNT_COMPROMISE",
            total: alerts.filter(
                (alert) => alert.type === "POSSIBLE_ACCOUNT_COMPROMISE"
            ).length
        }
    ];

    const recentEvents = [...events]
        .sort(
            (a, b) =>
                new Date(b.timestamp) - new Date(a.timestamp)
        )
        .slice(0, 5);

    if (loading) {
        return <p>Carregando dashboard...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="dashboard">

            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Visão geral dos eventos e alertas de segurança.</p>
            </div>

            <div className="metrics-grid">

                <div className="metric-card">
                    <h3>Total de Eventos</h3>
                    <p>{events.length}</p>
                </div>

                <div className="metric-card">
                    <h3>Alertas Abertos</h3>
                    <p>{openAlerts}</p>
                </div>

                <div className="metric-card">
                    <h3>Alertas Críticos</h3>
                    <p>{criticalAlerts}</p>
                </div>

                <div className="metric-card">
                    <h3>Alertas Resolvidos</h3>
                    <p>{resolvedAlerts}</p>
                </div>

            </div>
            <div className="dashboard-section">
                <h2>Alertas por Severidade</h2>

                <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={alertsBySeverity}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />

                            <XAxis
                                dataKey="severity"
                                tick={{ fill: "#94a3b8", fontSize: 12 }}
                                axisLine={{ stroke: "#334155" }}
                                tickLine={false}
                            />

                            <YAxis
                                allowDecimals={false}
                                tick={{ fill: "#94a3b8", fontSize: 12 }}
                                axisLine={{ stroke: "#334155" }}
                                tickLine={false}
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#0f172a",
                                    border: "1px solid #334155",
                                    borderRadius: "8px",
                                    color: "#f8fafc"
                                }}
                                cursor={{ fill: "#172033" }}
                            />

                            <Bar
                                dataKey="total"
                                fill="#38bdf8"
                                radius={[6, 6, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="dashboard-section">
                <h2>Alertas por Tipo</h2>

                <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={alertsByType}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />

                            <XAxis
                                dataKey="type"
                                tick={{ fill: "#94a3b8", fontSize: 11 }}
                                axisLine={{ stroke: "#334155" }}
                                tickLine={false}
                            />

                            <YAxis
                                allowDecimals={false}
                                tick={{ fill: "#94a3b8", fontSize: 12 }}
                                axisLine={{ stroke: "#334155" }}
                                tickLine={false}
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#0f172a",
                                    border: "1px solid #334155",
                                    borderRadius: "8px",
                                    color: "#f8fafc"
                                }}
                                cursor={{ fill: "#172033" }}
                            />

                            <Bar
                                dataKey="total"
                                fill="#38bdf8"
                                radius={[6, 6, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="dashboard-section">
                <div className="section-header">
                    <div>
                        <h2>Eventos Recentes</h2>
                        <p>Últimos eventos registrados pelo sistema.</p>
                    </div>
                </div>

                {recentEvents.length === 0 ? (
                    <p className="empty-message">
                        Nenhum evento encontrado.
                    </p>
                ) : (
                    <div className="recent-events-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Tipo</th>
                                    <th>Usuário</th>
                                    <th>IP</th>
                                    <th>Dispositivo</th>
                                    <th>Horário</th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentEvents.map((event) => (
                                    <tr key={event.id}>
                                        <td>
                                            <span className="event-type">
                                                {event.eventType}
                                            </span>
                                        </td>

                                        <td>{event.username || "-"}</td>

                                        <td>{event.sourceIp || "-"}</td>

                                        <td>{event.deviceName || "-"}</td>

                                        <td>
                                            {new Date(event.timestamp).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;