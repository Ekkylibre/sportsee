import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { fetchUserActivity } from '../../services/userService';
import "./weight.css";
import ErrorMessage from '../errorMessage/ErrorMessage';

/**
 * Composant pour afficher l'activité quotidienne de l'utilisateur sous forme de graphique.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {number} props.userId - L'identifiant de l'utilisateur.
 * @returns {JSX.Element} Le composant Weight.
 */
function Weight({ userId }) {
    const [activityData, setActivityData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userActivity = await fetchUserActivity(userId);
                setActivityData(userActivity.sessions);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, [userId]);

    /**
     * Composant de tooltip personnalisé pour le graphique.
     *
     * @param {Object} props - Les propriétés du composant.
     * @param {boolean} props.active - Indique si le tooltip est actif.
     * @param {Array} props.payload - Les données du tooltip.
     * @returns {JSX.Element|null} Le tooltip personnalisé.
     */
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

    /**
     * Formate les valeurs de l'axe X pour afficher uniquement le jour du mois.
     *
     * @param {string} tickItem - La valeur de l'axe X.
     * @returns {number} Le jour du mois.
     */
    const formatXAxis = (tickItem) => {
        const date = new Date(tickItem);
        return date.getDate();
    };

    return (
        <>
            {error && <ErrorMessage message={error} />}
            {!error && activityData.length > 0 && (
                <div className='weight-container'>
                    <div className='weight-title'>Activité quotidienne</div>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={activityData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            barSize={10}
                            barGap={10}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} />
                            <XAxis
                                dataKey="day"
                                tickFormatter={formatXAxis}
                                tickLine={false}
                                tickMargin={15}
                            />
                            <YAxis
                                orientation="right"
                                axisLine={false}
                                tickLine={false}
                                tickMargin={40}
                                interval={1}
                                domain={['auto', 'auto']}
                            />
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
                                stroke={'black'}
                            />
                            <Bar
                                dataKey="kilogram"
                                fill="black"
                                name="Poids (kg)"
                                radius={[10, 10, 0, 0]}
                                label={({ value }) => `${value} kg`}
                            />
                            <Bar
                                dataKey="calories"
                                fill="red"
                                name="Calories brûlées (kCal)"
                                radius={[10, 10, 0, 0]}
                                label={({ value }) => `${value} kcal`}
                            />
                            <ReferenceLine y={200} stroke="grey" strokeDasharray="3 3" />
                            <ReferenceLine y={400} stroke="grey" strokeDasharray="3 3" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </>
    );
}

export default Weight;
