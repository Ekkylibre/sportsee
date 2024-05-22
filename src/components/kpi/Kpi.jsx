import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import fetchUserData from '../../services/userService';
import './kpi.css';

function Kpi({ userId }) {
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

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!userData) {
        return <div className="loading">Loading...</div>;
    }

    const todayScore = userData.score * 100;

    const data = [
        { name: 'Score du jour', value: todayScore },
        { name: 'Reste', value: 100 - todayScore }
    ];

    const COLORS = ['#e60000', 'transparent'];

    return (
        <div className="kpi-container">
            <div className="score-title">Score</div>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        startAngle={90}
                        endAngle={450}
                        innerRadius={70}
                        outerRadius={80}
                        cornerRadius={10}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="centered-text">
                <div>{`${todayScore}%`}</div>
                <div className="text-container">de votre objectif</div>
            </div>
        </div>
    );
}

export default Kpi;
