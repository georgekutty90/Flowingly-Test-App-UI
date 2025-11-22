interface OutputDisplayProps {
  parseData: string;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ parseData }) => {
  return <pre className="output-box" data-testid="output-display">{parseData}</pre>;
};

export default OutputDisplay;