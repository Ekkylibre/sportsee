import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { USER_MAIN_DATA } from '../../assets/data/data';
import './kpi.css'; // Assurez-vous de créer ce fichier CSS

function Kpi({ userId }) {
    const foundUser = USER_MAIN_DATA.find((user) => user.id === parseInt(userId));

    const todayScore = foundUser.todayScore * 100 || foundUser.score * 100;

    const data = [
        { name: 'Score du jour', value: todayScore },
        { name: 'Reste', value: 100 - todayScore }
    ];

    const COLORS = ['#e60000', 'transparent'];

    return (
        <div className="kpi-container">
            <ResponsiveContainer width="100%" height="auto">
                <div className='score-title'>Score</div>
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
                <div className="centered-text">
                    <div>{`${todayScore}%`}</div>
                    <div className='text-container'>de votre objectif</div>
                </div>
            </ResponsiveContainer>
        </div>
    );
}

export default Kpi;
