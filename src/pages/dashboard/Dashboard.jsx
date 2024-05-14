import NavBar from "../../components/navBar/NavBar";
import SideBar from "../../components/verticalBar/VerticalBar";
import "./dashboard.css"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { USER_MAIN_DATA } from "../../assets/data/data";

function Dashboard() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const foundUser = USER_MAIN_DATA.find((user) => user.id === parseInt(userId));
    setUser(foundUser);
  }, [userId]);

  return (
    <div>
      <NavBar />
      <SideBar />
      <main>
        <div className="main-container">
          <div className="title">
            {user && (
              <>
                <h1>Bonjour <span className="red">{user.userInfos.firstName}</span></h1>
                <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
