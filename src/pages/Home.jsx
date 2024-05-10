import { NavLink } from 'react-router-dom';
import "./home.css"

function Home() {
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

      <aside className="vertical-bar">
        <div className='icons'>
          <img className='icon' src="/yoga.png" alt="yoga icon" />
          <img className='icon' src="/swim.png" alt="swim icon" />
          <img className='icon' src="/bike.png" alt="bike icon" />
          <img className='icon' src="fitness.png" alt="fitness icon" />
        </div>
        <div className='copiryght'>Copiryght, SportSee 2020</div>
      </aside>
    </div>
  );
}

export default Home;