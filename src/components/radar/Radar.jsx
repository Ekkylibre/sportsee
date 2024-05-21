import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { USER_PERFORMANCE } from '../../assets/data/data';

function RadarComponent({ userId }) {

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

  const getUserPerformanceData = (userId) => {
    const userPerformance = USER_PERFORMANCE.find(user => user.userId === parseInt(userId));
    if (!userPerformance) {
      return <div>User not found</div>;
    }

    const { kind, data } = userPerformance;
    return data.map(item => ({
      subject: formatLabel(kind[item.kind]),
      value: item.value,
      fullMark: 150,
    })).reverse();
  };

  const data = getUserPerformanceData(userId);

  return (
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
  );
}

export default RadarComponent;
