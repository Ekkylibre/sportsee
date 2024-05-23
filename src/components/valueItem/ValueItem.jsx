import './valueItem.css';

function ValueItem({ value, title, nutrientIcon }) {
  // Vérifie si la valeur est un nombre ou une chaîne de caractères
  const displayValue = value !== undefined && value !== null ? value : 'N/A';

  return (
    <div className="value">
      <div>{nutrientIcon}</div>
      <div>
        <div className="value-display">{displayValue}</div>
        <div className="title">{title}</div>
      </div>
    </div>
  );
}

export default ValueItem;
