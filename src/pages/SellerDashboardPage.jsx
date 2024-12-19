import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Collapse,
  ListItemIcon,
} from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Dashboard as DashboardIcon,
  Store as StoreIcon,
  ShoppingCart as ShoppingCartIcon,
  AccountCircle as AccountCircleIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { Outlet, Link } from "react-router-dom";
import LogoText from "../components/LogoText";

const theme = createTheme();

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100%",
  position: "relative",
}));

const Header = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  padding: "10px",
  height: "80px",
  backgroundColor: "#0078AA",
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: 280,
  flexShrink: 0,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  position: "fixed",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  overflow: "hidden",
}));

const ProfileSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: theme.spacing(4),
}));

const SidebarContent = styled(List)(({ theme }) => ({
  width: "100%",
}));

const SidebarContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

const Content = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.background.default,
  marginLeft: 280,
  padding: theme.spacing(3),
  marginTop: 80,
}));

const CenteredText = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "2rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

const SellerDashboard = () => {
  const [open, setOpen] = useState({ products: false, promotions: false });
  const [isSidebarClicked, setIsSidebarClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    setCurrentPage(window.location.pathname);
    window.scrollTo(0, 0);
  }, [window.location.pathname]);

  const handleClick = (item) => {
    setOpen((prevState) => ({ ...prevState, [item]: !prevState[item] }));
    setIsSidebarClicked(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Wrapper>
        <Header position="fixed">
          <Toolbar>
            <Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
              Seller Dashboard
            </Typography>
            <LogoText />
          </Toolbar>
        </Header>
        <Sidebar>
          <SidebarContentWrapper>
            <ProfileSection>
              <Typography variant="h6">Seller</Typography>
              <Divider
                style={{
                  width: "100%",
                  marginTop: theme.spacing(2),
                  marginBottom: theme.spacing(2),
                }}
              />
            </ProfileSection>
            <SidebarContent component="nav">
              <ListItem
                button
                component={Link}
                to="storeanalytics"
                onClick={() => setIsSidebarClicked(true)}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Store Analytics"
                  sx={{ color: "black" }}
                />
              </ListItem>
              <ListItem button onClick={() => handleClick("products")}>
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="Products" sx={{ color: "black" }} />
                {open.products ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open.products} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={Link}
                    to="productlist"
                    style={{ marginLeft: theme.spacing(7) }}
                  >
                    <ListItemText
                      primary="Product List"
                      sx={{ color: "black" }}
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to="addproduct"
                    style={{ marginLeft: theme.spacing(7) }}
                  >
                    <ListItemText
                      primary="Add Product"
                      sx={{ color: "black" }}
                    />
                  </ListItem>
                </List>
              </Collapse>
              <ListItem button onClick={() => handleClick("promotions")}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Promotions" sx={{ color: "black" }} />
                {open.promotions ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open.promotions} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    component={Link}
                    to="promotionlist"
                    style={{ marginLeft: theme.spacing(7) }}
                  >
                    <ListItemText
                      primary="Promotion List"
                      sx={{ color: "black" }}
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to="addpromotion"
                    style={{ marginLeft: theme.spacing(7) }}
                  >
                    <ListItemText
                      primary="Add Promotion"
                      sx={{ color: "black" }}
                    />
                  </ListItem>
                </List>
              </Collapse>
              <ListItem button component={Link} to="profilesettings">
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Profile Settings"
                  sx={{ color: "black" }}
                />
              </ListItem>
            </SidebarContent>
          </SidebarContentWrapper>
        </Sidebar>
        <Content>
          {currentPage === "/dashboardseller" && !isSidebarClicked && (
            <div
              style={{
                marginTop: "220px",
                textAlign: "center",
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            >
              Welcome to Seller Dashboard!
            </div>
          )}
          <Outlet />
        </Content>
      </Wrapper>
    </ThemeProvider>
  );
};

export default SellerDashboard;
