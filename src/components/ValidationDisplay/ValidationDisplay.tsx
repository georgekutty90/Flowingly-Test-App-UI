interface ValidationDisplayProps {
  message: string;
}

const ValidationDisplay: React.FC<ValidationDisplayProps> = ({ message }) => {
  return <div className="error-box" data-testid="validation-error">{message}</div>;
};

export default ValidationDisplay;
