import NavBar from "../../components/navBar/NavBar";
import SideBar from "../../components/verticalBar/VerticalBar";
import "./home.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Toggle from "../../components/toggle/Toggle";

function Home() {
    const [useApiData, setUseApiData] = useState(true); // État pour basculer entre API et données statiques

    const handleToggle = () => {
        setUseApiData(!useApiData);
    };

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

                    <Toggle checked={useApiData} onChange={handleToggle} />

                    <div className="user-btn">
                        <Link to={`/dashboard/user/12?useApiData=${useApiData}`}><button>User 12</button></Link>
                        <Link to={`/dashboard/user/18?useApiData=${useApiData}`}><button>User 18</button></Link>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Home;
