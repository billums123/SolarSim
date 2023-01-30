import { Box } from "@mui/material";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";

const App = () => {
  return (
    <Box component="div" className="app">
      <Header />
      <MainContainer />
    </Box>
  );
};

export default App;
