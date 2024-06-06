import "./header.css";
import { useState, useEffect } from "react";
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

/**
 * Composant Header qui affiche un message de bienvenue à l'utilisateur.
 * 
 * @component
 * @param {Object} props - Les propriétés passées au composant.
 * @param {string} props.userId - L'identifiant de l'utilisateur.
 * @returns {JSX.Element} Un élément JSX représentant l'en-tête.
 */
function Header({ userId }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!/^\d+$/.test(userId)) {
          throw new Error('Identifiant utilisateur invalide.');
        }

        const response = await axios.get(`${BASE_URL}/user/${userId}`);
        const foundUser = response.data.data;

        if (!foundUser) {
          throw new Error('Utilisateur non trouvé.');
        }

        setUser(foundUser);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError('Utilisateur non trouvé.');
        } else {
          setError('Erreur lors de la récupération de l\'utilisateur.');
        }
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div>
      {error && (
        <p className="error">{error}</p>
      )}
      {user && user.userInfos.firstName && (
        <div className="title">
          <h1>Bonjour <span className="red">{user.userInfos.firstName}</span></h1>
          <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
      )}
    </div>
  );
}

export default Header;
