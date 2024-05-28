import "./header.css";
import { useState, useEffect } from "react";
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

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
        setError(error.message);
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
