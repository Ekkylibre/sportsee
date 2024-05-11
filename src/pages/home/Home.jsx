import NavBar from "../../components/navBar/NavBar";
import SideBar from "../../components/verticalBar/VerticalBar";
import "./home.css";

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
                        <button>User 12</button>
                        <button>User 18</button>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Home