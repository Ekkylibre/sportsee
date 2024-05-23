import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import fetchUserData from '../../services/userService';
import "./goals.css";
import { useState, useEffect } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage.jsx';

function Goals({ userId }) {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const data = fetchUserData(userId);
            setUserData(data);
        } catch (err) {
            setError(err.message);
        }
    }, [userId]);

    // Composant Tooltip personnalisé
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${payload[0].payload.sessionLength} min`}</p>
                </div>
            );
        }

        return null;
    };

    // Composant Cursor personnalisé
    const CustomCursor = ({ points, width }) => {
        if (!points || points.length === 0) return null;

        const { x } = points[0];

        return (
            <rect
                x={x}
                y={0}
                width={width}
                height="300px"
                fill="black"
                opacity={0.2}
            />
        );
    };

    const { averageSessions } = userData || {};

    // Ajouter des points fictifs au début et à la fin des sessions
    const sessionsWithFictives = [
        { day: 0, sessionLength: null },
        ...(averageSessions || []),
        { day: (averageSessions || []).length + 1, sessionLength: null }
    ];

    // Fonction pour formatter les étiquettes de l'axe X
    const formatXAxis = (tickItem) => {
        const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
        return tickItem > 0 && tickItem <= daysOfWeek.length ? daysOfWeek[tickItem - 1] : '';
    };

    return (
        <>
            {error && <ErrorMessage message={error} />}
            {!error && (
                <div className='goals'>
                    {userData && (
                        <>
                            <div className="duration-title">Durée moyenne des sessions</div>
                            <div className="responsive-chart-container">
                                <ResponsiveContainer width="100%" height={263}>
                                    <LineChart
                                        data={sessionsWithFictives}
                                        margin={{ top: 80, right: 0, left: 0, bottom: 20 }}
                                    >
                                        <XAxis
                                            dataKey="day"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fontWeight: 500 }}
                                            stroke='rgba(255, 255, 255, 0.5)'
                                            tickFormatter={formatXAxis}
                                        />
                                        <Tooltip
                                            cursor={<CustomCursor />}
                                            content={<CustomTooltip />}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="sessionLength"
                                            stroke="#FFFFFF"
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export default Goals;
