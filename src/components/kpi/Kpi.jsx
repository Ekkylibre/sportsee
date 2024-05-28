import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import fetchUserData from '../../services/userService';
import './kpi.css';
import ErrorMessage from '../errorMessage/ErrorMessage';

function Kpi({ userId }) {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchUserData(userId);
                setUserData(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, [userId]);

    const todayScore = userData ? userData.score * 100 : 0;

    const data = [
        { name: 'Score du jour', value: todayScore },
        { name: 'Reste', value: 100 - todayScore }
    ];

    const COLORS = ['#e60000', 'transparent'];

    return (
        <>
            {error && <ErrorMessage message={error} />}
            {!error && userData && (
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
            )}
        </>
    );
}

export default Kpi;
