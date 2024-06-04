import "./toggle.css";

function Toggle({ checked, onChange }) {
    return (
        <label className="switch">
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className="slider"></span>
            <span className="toggle-text">{checked ? 'API' : 'Statique'}</span>
        </label>
    );
}

export default Toggle;
