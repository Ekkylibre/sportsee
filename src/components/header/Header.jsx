import "./header.css"

function Header({ user }) {
  return (
    <div>
      {user && (
        <>
          <h1>Bonjour <span className="red">{user.userInfos.firstName}</span></h1>
          <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
        </>
      )}
    </div>
  );
}

export default Header;
