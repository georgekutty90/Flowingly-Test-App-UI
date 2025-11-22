interface InputTextAreaProps {
  inputText: string;
  onTextChange: (value: string) => void;
}

const InputTextArea: React.FC<InputTextAreaProps> = ({ inputText, onTextChange }) => {
  const onInputTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    onTextChange(event.target.value);
  };

  return (
    <textarea
      className="input-box"
      placeholder="Paste email or text block here..."
      onChange={onInputTextChange}
      value={inputText}
    />
  );
};

export default InputTextArea;