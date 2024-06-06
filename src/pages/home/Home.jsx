import NavBar from "../../components/navBar/NavBar";
import SideBar from "../../components/verticalBar/VerticalBar";
import "./home.css";
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <NavBar />
            <SideBar />
            <main>
                <div className="main-container">
                    <div className="title">
                        <h1>Bienvenue sur <span className="red">SportSee</span></h1>
                        <p>Choisissez un utilisateur ci-dessous pour accéder au tableau de bord 😄</p>
                    </div>
                    <div className="user-btn">
                        <Link to="/dashboard/user/12"><button>User 12</button></Link>
                        <Link to="/dashboard/user/18"><button>User 18</button></Link>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Home;
