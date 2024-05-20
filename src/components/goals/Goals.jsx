import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { USER_AVERAGE_SESSIONS } from '../../assets/data/data';
import "./goals.css";

function Goals({ userId }) {
    const userData = USER_AVERAGE_SESSIONS.find((user) => user.userId === parseInt(userId, 10));

    if (!userData) {
        return <div>User not found</div>;
    }

    // Fonction pour formatter les étiquettes de l'axe X
    const formatXAxis = (tickItem) => {
        const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
        return daysOfWeek[tickItem];
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
                width={Math.max(0, width - x)}
                height="1000px"
                fill="black"
                opacity={0.2}
            />
        );
    };

    return (
        <div className='goals'>
            <div className="duration-title">Durée moyenne des sessions</div>
            <ResponsiveContainer width="100%" height={263} >
                <LineChart
                    data={userData.sessions}
                    margin={{
                        top: 80, right: 20, left: 20, bottom: 20,
                    }}
                >
                    <XAxis 
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
                    <Line type="monotone" dataKey="sessionLength" stroke="#FFFFFF" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Goals;
