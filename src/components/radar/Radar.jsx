import { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import fetchUserData from '../../services/userService';
import ErrorMessage from '../errorMessage/ErrorMessage';

function RadarComponent({ userId }) {
    const [performanceData, setPerformanceData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetchUserData(userId);
                setPerformanceData(userData.performance);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, [userId]);

    const formatLabel = (value) => {
        switch (value) {
            case 'cardio': return 'Cardio';
            case 'energy': return 'Énergie';
            case 'endurance': return 'Endurance';
            case 'strength': return 'Force';
            case 'speed': return 'Vitesse';
            case 'intensity': return 'Intensité';
            default: return value;
        }
    };

    const data = performanceData.map(item => ({
        subject: formatLabel(item.kind),
        value: item.value,
        fullMark: 150,
    })).reverse();

    return (
        <>
            {error && <ErrorMessage message={error} />}
            {!error && (
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid gridType="polygon" radialLines={false} polarRadius={[0, 20, 40, 60, 80, 100]} />
                        <PolarAngleAxis
                            dataKey="subject"
                            tick={{ fill: 'white' }}
                        />
                        <Radar name="Performance" dataKey="value" fill="red" fillOpacity={0.6} />
                        <Tooltip
                            contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", color: "white" }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            )}
        </>
    );
}

export default RadarComponent;
