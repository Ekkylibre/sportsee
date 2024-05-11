import { NavLink } from 'react-router-dom';
import "./navbar.css"

function NavBar() {
  return (
    <div className='nav-bar'>
      <nav>
        <ul>
          <div className='nav-links'>
            <img className='nav-img' src="/SportSee.png" alt="Logo" />
            <li><NavLink to="/">Accueil</NavLink></li>
            <li><NavLink to="/">Profil</NavLink></li>
            <li><NavLink to="/">Réglage</NavLink></li>
            <li><NavLink to="/">Communauté</NavLink></li>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
