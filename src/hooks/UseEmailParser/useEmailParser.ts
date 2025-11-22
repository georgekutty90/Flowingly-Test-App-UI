import { useState } from "react";
import axiosInstance from "../../api/client";

interface ParseData {
  IsSuccess: boolean;
  Message: string;
  SalesTax: number;
  TotalExcludingTax: number;
  CostCentre: string;
}

export interface UseEmailParserResult {
  isSuccess: boolean;
  parseData: ParseData | undefined;
  isLoading: boolean;
  message: string;
  submitEmailParser: (inputText: string) => Promise<void>;
  clearParseData: () => void;
}

const useEmailParser = (): UseEmailParserResult => {
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  const [parseData, setParseData] = useState<ParseData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const submitEmailParser = async (inputText: string) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_APP_API_EMAIL_PARSER_URL}`,
        {
          Text: inputText,
        }
      );
      if (response != null && response.data != null) {
        setMessage(response.data.message);
        setParseData(response.data);
        setIsSuccess(response.data.isSuccess);
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage(JSON.stringify(error, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const clearParseData = () => {
    setIsSuccess(true);
    setMessage("");
    setParseData(undefined);
  };

  return {
    isSuccess,
    parseData,
    isLoading,
    message,
    submitEmailParser,
    clearParseData,
  };
};

export default useEmailParser;
