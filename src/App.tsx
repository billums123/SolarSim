import { Box } from "@mui/material";
import Header from "./components/Header";
import OrangeSunSVG from "./assets/sun_orange.svg";
import MainContainer from "./components/MainContainer";

const App = () => {
  return (
    <Box component="div" className="app">
      <Header />
      <img src={OrangeSunSVG} alt="orange sun" className="svg" />
      <MainContainer />
    </Box>
  );
};

export default App;
