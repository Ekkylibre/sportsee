import "./errorMessage.css";

function ErrorMessage({ message }) {
  return <div className="error-message">
    <div className="error-message-content">{message}</div>
    </div>;
}

export default ErrorMessage;
