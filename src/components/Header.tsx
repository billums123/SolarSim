import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import "../stylesheets/header.css";
import theme from "../theme";

const Header = () => {
  return (
    <Box component="div">
      <AppBar component="nav" className="header">
        <Toolbar>
          <Typography variant="h4" component="div">
            <strong style={{ color: theme.palette.secondary.main }}>
              Solar
            </strong>
            <strong style={{ color: theme.palette.primary.contrastText }}>
              Sim
            </strong>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
