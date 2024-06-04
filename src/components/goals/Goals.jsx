import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchUserData } from '../../services/userService';
import ErrorMessage from '../errorMessage/ErrorMessage.jsx';
import "./goals.css"

/**
 * Composant pour afficher les objectifs de l'utilisateur.
 *
 * @component
 * @param {Object} props Les propriétés du composant.
 * @param {number} props.userId L'identifiant de l'utilisateur.
 * @returns {JSX.Element} Le composant Goals.
 */
function Goals({ userId }) {
    /**
     * Les données de l'utilisateur.
     * @type {Object|null}
     */
    const [userData, setUserData] = useState(null);
    
    /**
     * Message d'erreur en cas de problème.
     * @type {string|null}
     */
    const [error, setError] = useState(null);

    useEffect(() => {
        /**
         * Fonction pour récupérer les données de l'utilisateur.
         * @async
         * @returns {Promise<void>}
         */
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

    /**
     * Composant personnalisé pour afficher le tooltip.
     * @param {Object} props Les propriétés du composant.
     * @param {boolean} props.active Si le tooltip est actif.
     * @param {Object[]} props.payload Les données du tooltip.
     * @returns {JSX.Element} Le composant CustomTooltip.
     */
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

    /**
     * Composant personnalisé pour afficher le curseur.
     * @param {Object} props Les propriétés du composant.
     * @param {Object[]} props.points Les points du curseur.
     * @param {number} props.width La largeur du curseur.
     * @returns {JSX.Element|null} Le composant CustomCursor.
     */
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
    const sessionsWithFictives = [
        { day: 0, sessionLength: null },
        ...(averageSessions || []),
        { day: (averageSessions || []).length + 1, sessionLength: null }
    ];

    /**
     * Fonction pour formater l'axe des abscisses.
     * @param {number} tickItem La valeur du tick.
     * @returns {string} Le formaté de l'axe des abscisses.
     */
    const formatXAxis = (tickItem) => {
        const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
        return tickItem > 0 && tickItem <= daysOfWeek.length ? daysOfWeek[tickItem - 1] : '';
    };

    return (
        <>
            {error && <ErrorMessage message={error} />}
            {!error && userData && (
                <div className='goals'>
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
                </div>
            )}
        </>
    );
}

export default Goals;
