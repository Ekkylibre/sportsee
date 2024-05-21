import { Link } from "react-router-dom"
import './error.css'
import NavBar from "../../components/navBar/NavBar"
import SideBar from "../../components/verticalBar/VerticalBar"

function Error() {
  return (
    <div>
      <NavBar />
      <SideBar />
      <main>
        <div className="main-container">
          <div className='error-container'>
            <h1>404</h1>
            <p>Oups! La page que vous demandez n’existe pas.</p>
            <Link to="/" className='link'>Retourner sur la page d’accueil</Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Error