import React, { useState } from "react";
import Button from "../../components/Button/Button.tsx";
import InputTextArea from "../../components/InputTextArea/InputTextArea";
import ValidationDisplay from "../../components/ValidationDisplay/ValidationDisplay";
import useEmailParser from "../../hooks/UseEmailParser/useEmailParser";
import OutputDisplay from "../../components/OutputDisplay/OutputDisplay";

const EmailParser: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [isEnable, setIsEnable] = useState<boolean>(false);
  const { isLoading, isSuccess, parseData, message, submitEmailParser, clearParseData } =
    useEmailParser();

  const handleInputTextChange = (value: string): void => {
    setInputText(value);
    if (value != "") setIsEnable(true);
    else setIsEnable(false);
  };

  const handleFormSubmit = (): void => {
    submitEmailParser(inputText);
  };

  const handleClearInputText = (): void => {
    setInputText("");
    clearParseData();
    setIsEnable(false);
  };

  return (
    <>
      <div className="container">
        <h2 data-testid="title">XML / Email Parser</h2>
        <InputTextArea
          onTextChange={handleInputTextChange}
          inputText={inputText}
        ></InputTextArea>
        <div className="button-group">
          <Button
            className="submit"
            value="Submit to Server"
            isEnable={isEnable}
            onClick={handleFormSubmit}
          ></Button>
          <Button
            className="clear"
            value="Clear"
            isEnable={isEnable}
            onClick={handleClearInputText}
          ></Button>
        </div>

        {isSuccess && !isLoading && (
          <div className="output-container">
            <h3>Parsed JSON Output</h3>
            <OutputDisplay
              parseData={JSON.stringify(parseData, null, 2)}
            ></OutputDisplay>
          </div>
        )}

        {!isSuccess && !isLoading && (
          <div className="error-container">
            <h3>Validation Errors</h3>
            <ValidationDisplay message={message}></ValidationDisplay>
          </div>
        )}
      </div>
    </>
  );
};

export default EmailParser;
