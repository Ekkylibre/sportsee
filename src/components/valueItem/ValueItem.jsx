import './valueItem.css';

function ValueItem({ number, title, nutrientIcon }) {
  const displayNumber = number ? number : 'N/A';

  return (
    <div className="value">
      <div>{nutrientIcon}</div>
      <div>
        <div className="number">{displayNumber}</div>
        <div className="title">{title}</div>
      </div>
    </div>
  );
}

export default ValueItem;
