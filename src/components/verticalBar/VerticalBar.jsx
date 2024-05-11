import "./verticalbar.css"

function SideBar() {
  const yogaIcon = "/yoga.png";
  const swimIcon = "/swim.png";
  const bikeIcon = "/bike.png";
  const fitnessIcon = "/fitness.png";

  return (
    <aside className="vertical-bar">
      <div className='icons'>
        <img className='icon' src={yogaIcon} alt="yoga icon" />
        <img className='icon' src={swimIcon} alt="swim icon" />
        <img className='icon' src={bikeIcon} alt="bike icon" />
        <img className='icon' src={fitnessIcon} alt="fitness icon" />
      </div>
      <div className='copiryght'>Copiryght, SportSee 2020</div>
    </aside>
  );
}

export default SideBar;
