import NavBar from "../components/navBar/NavBar";
import SideBar from "../components/verticalBar/VerticalBar";
import "./dashboard.css"

function Dashboard() {
  return (
    <div>
      <NavBar />
      <SideBar />
      <main>
        <div className="main-container">
          <div className="title">
            <h1>Bonjour</h1>
            <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;