import "./header.css";
import { useState, useEffect } from "react";
import { USER_MAIN_DATA } from "../../assets/data/data";

function Header({ userId }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (!/^\d+$/.test(userId)) {
        throw new Error('Invalid userId');
      }
      
      const foundUser = USER_MAIN_DATA.find((user) => user.id === parseInt(userId));
      if (!foundUser) {
        throw new Error('User not found');
      }
      
      setUser(foundUser);
    } catch (error) {
      setError(error.message);
    }
  }, [userId]);

  return (
    <div>
      {error && (
        <p className="error">{error}</p>
      )}
      {user && user.userInfos.firstName && (
        <>
          <h1>Bonjour <span className="red">{user.userInfos.firstName}</span></h1>
          <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
        </>
      )}
    </div>
  );
}

export default Header;
