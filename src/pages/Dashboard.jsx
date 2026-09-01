import { useEffect, useState } from "react";
import api from "../services/api";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function Dashboard() {
    const [events, setEvents] = useState([]);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        async function loadDashboardData() {
            try {
                const eventsResponse = await api.get("/events");
                const alertsResponse = await api.get("/alerts");

                setEvents(eventsResponse.data);
                setAlerts(alertsResponse.data);
            } catch (error) {
                console.error("Erro ao carregar dashboard:", error);
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

    return (
        <div>
            <h1>Dashboard</h1>

            <div>
                <h3>Total de Eventos</h3>
                <p>{events.length}</p>
            </div>

            <div>
                <h3>Alertas Abertos</h3>
                <p>{openAlerts}</p>
            </div>

            <div>
                <h3>Alertas Críticos</h3>
                <p>{criticalAlerts}</p>
            </div>

            <div>
                <h3>Alertas Resolvidos</h3>
                <p>{resolvedAlerts}</p>
            </div>
            <div>
                <h2>Alertas por Severidade</h2>

                <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={alertsBySeverity}>
                            <XAxis dataKey="severity" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />

                            <Bar
                                dataKey="total"
                                fill="#8884d8"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div>
                <h2>Alertas por Tipo</h2>

                <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={alertsByType}>
                            <XAxis dataKey="type" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar
                                dataKey="total"
                                fill="#8884d8"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div>
                <h2>Eventos Recentes</h2>

                {recentEvents.length === 0 ? (
                    <p>Nenhum evento encontrado.</p>
                ) : (
                    <ul>
                        {recentEvents.map((event) => (
                            <li key={event.id}>
                                {event.eventType}
                                {" - "}
                                {event.username}
                                {" - "}
                                {event.sourceIp}
                                {" - "}
                                {new Date(event.timestamp).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Dashboard;