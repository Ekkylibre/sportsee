import { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { fetchUserData } from '../../services/userService';
import ErrorMessage from '../errorMessage/ErrorMessage';

/**
 * Composant pour afficher un graphique radar de performances.
 *
 * @component
 * @param {Object} props Les propriétés du composant.
 * @param {number} props.userId L'identifiant de l'utilisateur.
 * @returns {JSX.Element} Le composant RadarComponent.
 */
function RadarComponent({ userId }) {
    /**
     * Données de performance de l'utilisateur.
     * @type {Array<Object>}
     */
    const [performanceData, setPerformanceData] = useState([]);

    /**
     * Message d'erreur en cas de problème.
     * @type {string|null}
     */
    const [error, setError] = useState(null);

    useEffect(() => {
        /**
         * Fonction pour récupérer les données de performance de l'utilisateur.
         * @async
         * @returns {Promise<void>}
         */
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

    /**
     * Formate le label de la performance.
     * @param {string} value La valeur de la performance.
     * @returns {string} Le label formaté.
     */
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

    /**
     * Données pour le graphique radar.
     * @type {Array<Object>}
     */
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
