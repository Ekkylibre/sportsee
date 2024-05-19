import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { USER_AVERAGE_SESSIONS } from '../../assets/data/data'; // Assurez-vous que le chemin est correct

function Goals({ userId }) {
    // Recherche des données d'activité de l'utilisateur
    const userData = USER_AVERAGE_SESSIONS.find((user) => user.userId === parseInt(userId, 10));

    if (!userData) {
        return <div>User not found</div>;
    }

    // Fonction pour formatter les étiquettes de l'axe X
    const formatXAxis = (tickItem) => {
        // Définition des noms des jours de la semaine
        const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
        // Récupération du nom du jour en fonction de la valeur numérique
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

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ResponsiveContainer>
                <LineChart
                    data={userData.sessions}
                    margin={{
                        top: 5, right: 20, left: 20, bottom: 5,
                    }}
                >
                    <XAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 12, fontWeight: 500}} 
                        stroke='rgba(255, 255, 255, 0.5)'
                        tickFormatter={formatXAxis} // Utilisation du formateur de ticks
                    />
                    <Tooltip 
                        cursor={{
                            strokeLinecap: 'square',
                            stroke: 'black',
                            strokeWidth: 79,
                            height: 10000,
                            strokeOpacity: 0.2,
                        }} 
                        content={<CustomTooltip />} // Utilisation du Tooltip personnalisé
                    />
                    <Line type="monotone" dataKey="sessionLength" stroke="#FFFFFF" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Goals;
