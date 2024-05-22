import  { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import fetchUserData from '../../services/userService';
import "./weight.css";

function Weight({ userId }) {
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

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className='kg'>{`${payload[0].value} kg`}</p>
                    <p className='kcal'>{`${payload[1].value} kcal`}</p>
                </div>
            );
        }

        return null;
    };

    const formatXAxis = (tickItem) => {
        // Extraction du jour à partir de la date
        const date = new Date(tickItem);
        return date.getDate();
    };

    return (
        <div className='weight-container'>
            <div className='weight-title'>Activité quotidienne</div>
            <ResponsiveContainer
                width="100%"
                height={300}>
                <BarChart
                    data={userData.activity}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    barSize={10}
                    barGap={10}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        horizontal={false} />
                    <XAxis
                        dataKey="day"
                        tickFormatter={formatXAxis}
                        tickLine={false}
                        tickMargin={15} />
                    <YAxis
                        orientation="right"
                        axisLine={false}
                        tickLine={false}
                        tickMargin={40}
                        interval={1}
                        domain={['auto', 'auto']}/>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                         wrapperStyle={{
                            position: 'absolute',
                            fontSize: 14,
                            verticalAlign: 'top',
                            right: 26,
                            top: 23,
                            height: 100,
                            stroke: 'black'
                          }}
                        verticalAlign="top"
                        align="right"
                        height={100}
                        iconType="circle"
                        iconSize={8}
                        stroke={'black'} />
                    <Bar
                        dataKey="kilogram"
                        fill="black"
                        name="Poids (kg)"
                        radius={[10, 10, 0, 0]}
                        label={({ value }) => `${value} kg`} />
                    <Bar
                        dataKey="calories"
                        fill="red"
                        name="Calories brûlées (kCal)"
                        radius={[10, 10, 0, 0]}
                        label={({ value }) => `${value} kcal`} />
                    <ReferenceLine
                        y={200}
                        stroke="grey"
                        strokeDasharray="3 3" />
                    <ReferenceLine
                        y={400}
                        stroke="grey"
                        strokeDasharray="3 3" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Weight;
