import './valueItem.css';

function ValueItem({ number, title, nutrientIcon }) {
  return (
    <div className="value">
      <div>{nutrientIcon}</div>
      <div>
        <div className="number">{number}</div>
        <div className="title">{title}</div>
      </div>
    </div>
  );
}

export default ValueItem;