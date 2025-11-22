import useTokenIntercepter from "../../hooks/UseTokenIntercepter/useTokenIntercepter";
import EmailParser from "../EmailParser/EmailParser";
import "./App.css";

const App: React.FC = () => {
  useTokenIntercepter();

  return <EmailParser />;
};

export default App;
