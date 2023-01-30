import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import "../stylesheets/header.css";

const Header = () => {
  return (
    <Box component="div">
      <AppBar component="nav" className="header">
        <Toolbar>
          <Typography variant="h6" component="div">
            SolarSim
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
