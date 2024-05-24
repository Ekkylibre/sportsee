import NavBar from "../../components/navBar/NavBar";
import SideBar from "../../components/verticalBar/VerticalBar";
import "./dashboard.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { USER_MAIN_DATA } from "../../assets/data/data";
import ValueItem from "../../components/valueItem/ValueItem";
import Kpi from "../../components/kpi/Kpi";
import Radar from "../../components/radar/Radar";
import Weight from "../../components/weight/Weight";
import Goals from "../../components/goals/Goals";
import Header from "../../components/header/Header";

function Dashboard() {

  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const foundUser = USER_MAIN_DATA.find((user) => user.id === parseInt(userId));
    setUser(foundUser);
  }, [userId, navigate]);


  return (
    <div>
      <NavBar />
      <SideBar />
      <main>
        <div className="main-container">
          <div className="title">
          <Header user={user} />
          </div>

          <div className="array">
            <div className="charts">
              <div className="poids"><Weight userId={userId} /></div>
              <div className="small-charts">
                <div className="goals"><Goals userId={userId} /></div>
                <div className="radar"><Radar userId={userId} /></div>
                <div className="kpi"><Kpi userId={userId} /></div>
              </div>
            </div>

            <div className="nutrients">
              <>
                <ValueItem userId={userId} iconIndex={0} value={user ? `${user.keyData.calorieCount}kcal` : 'N/A'} title="Calories" />
                <ValueItem userId={userId} iconIndex={1} value={user ? `${user.keyData.proteinCount}g` : 'N/A'} title="Protéines" />
                <ValueItem userId={userId} iconIndex={2} value={user ? `${user.keyData.carbohydrateCount}g` : 'N/A'} title="Glucides" />
                <ValueItem userId={userId} iconIndex={3} value={user ? `${user.keyData.lipidCount}g` : 'N/A'} title="Lipides" />
              </>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
