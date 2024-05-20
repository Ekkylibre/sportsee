import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { USER_AVERAGE_SESSIONS } from '../../assets/data/data';
import "./goals.css";

function Goals({ userId }) {
    const userData = USER_AVERAGE_SESSIONS.find((user) => user.userId === parseInt(userId, 10));

    if (!userData) {
        return <div>User not found</div>;
    }

    // Ajouter des points fictifs au début et à la fin des sessions
    const sessionsWithFictives = [
        { day: 0, sessionLength: null },
        ...userData.sessions,
        { day: userData.sessions.length + 1, sessionLength: null }
    ];

    // Fonction pour formatter les étiquettes de l'axe X
    const formatXAxis = (tickItem) => {
        const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
        return tickItem > 0 && tickItem <= daysOfWeek.length ? daysOfWeek[tickItem - 1] : '';
    };


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
    const CustomCursor = ({ points, width, height }) => {
        if (!points || points.length === 0) return null;

        const { x } = points[0];

        return (
            <rect
                x={x}
                y={0}
                width={width}
                height="263px"
                fill="black"
                opacity={0.2}
            />
        );
    };

    return (
        <div className='goals'>
            <div className="duration-title">Durée moyenne des sessions</div>
            <ResponsiveContainer width="100%" height="100%" >
                <LineChart
                    data={sessionsWithFictives}
                    margin={{ top: 100, bottom: 20 }}
                >
                    <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fontWeight: 500 }}
                        stroke='rgba(255, 255, 255, 0.5)'
                        tickFormatter={formatXAxis}
                        style={{ marginTop: 20 }}
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
                        isAnimationActive={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Goals;
