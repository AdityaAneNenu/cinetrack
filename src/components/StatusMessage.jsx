function StatusMessage({ text, type = "info" }) {
  return <p className={`status ${type}`}>{text}</p>;
}

export default StatusMessage;
