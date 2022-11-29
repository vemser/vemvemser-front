import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IDrawerContainerProps } from "../../utils/interfaces";
import { menuItems } from "../../utils/menuItems";
import { CaretLeft, List as ListIcon } from "phosphor-react";
import logoDbc from "../../assets/logo-blue.svg";

const drawerWidth = 240;
export const DrawerContainer = (props: IDrawerContainerProps) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar
        sx={{
          img: {
            maxWidth: "120px",
            display: "flex",
            margin: "0 auto",
          },
        }}
      >
        <img src={logoDbc} alt="logo" />
      </Toolbar>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <List>
          {menuItems.map((text) => (
            <ListItem key={text.text} disablePadding>
              <Button
                component={Link}
                variant={pathname === text.path ? "contained" : "outlined"}
                to={text.path}
                sx={{
                  width: "100%",
                  mx: 2,
                  mb: 1,
                }}
              >
                {text.text}
              </Button>
            </ListItem>
          ))}
        </List>
        <Button
          sx={{ mx: 2, mb: 1 }}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Sair
        </Button>
      </Box>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <ListIcon size={28} color="#ffffff" weight="bold" />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {menuItems.find((item) => item.path === pathname)?.text}
          </Typography>
          {pathname !== "/dashboard" && (
            <Button
              onClick={() => navigate(-1)}
              variant="text"
              color="secondary"
              id="drawerContainer-voltar"
              startIcon={
                <CaretLeft size={20} color="var(--white)" weight="bold" />
              }
              sx={{
                color: "var(--white)",
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              Voltar
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
};
