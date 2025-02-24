import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import bannerimage from "../../assets/images/Headerimg.png";
import Logo from "../../assets/images/TRYNO1AUTO LOGO.png";
import { FaBars } from "react-icons/fa";
import "./headerstyles.css";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const isSmallScreens = useMediaQuery("(max-width:768px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const location = useLocation();

  const linkStyles = {
    textDecoration: "none",
    color: "black",
    fontWeight: "bold",
    padding: "8px 16px",
    display: "block",
  };

  const activeLinkStyles = {
    color: "darkblue",
  };

  const drawerItemStyles = {
    width: "100%",
    textAlign: "center",
    padding: "10px 0",
    borderBottom: "1px solid lightgray", // Adds horizontal line
  };
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#FFD700", padding: "1rem 0", boxShadow: "none" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "column" },
          alignItems: "center",
        }}
      >
        {/* First Row: Logo, Title, Banner Image */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            px: 2,
          }}
        >
          {/* Logo Section */}
          <Box>
            <img
              className="responsive-logo"
              src={Logo}
              alt="Logo"
              style={{ width: 140, height: 110, borderRadius: "50%" }}
            />
          </Box>

          {/* Title Section */}
          <Box
            sx={{
              textAlign: "center",
              flexGrow: 1,
            }}
          >
            <Typography
              component="div"
              sx={{ fontWeight: "bold" }}
              className="main-title"
            >
              <span style={{ color: "#333333" }}>Trichy</span>{" "}
              <span>No.1 Auto</span>
            </Typography>
          </Box>

          {/* Banner Image Section */}
          <Box>
            <img
              className="Auto-Picture"
              src={bannerimage}
              alt="Auto Picture"
              style={{ width: 185, height: 150 }}
            />
          </Box>
        </Box>

        {/* Second Row: Remaining Content */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: { xs: "100%", sm: "100%", md: "auto" },
            flexDirection: { xs: "row", sm: "row", md: "column" },
          }}
        >
          {/* Text Content */}
          <Box sx={{ textAlign: "left" }}>
            <Typography variant="h6" component="div">
              <span className="title">Drivers Welfare Association</span>
            </Typography>

            <Typography variant="h6" component="div">
              <span className="subtitle">
                திருச்சி No.1 ஆட்டோ ஓட்டுனர் நலச்சங்கம்
              </span>
              <br />
              <span className="quote">"விரைவான சேவை. பாதுகாப்பான பயணம்"</span>
            </Typography>
          </Box>

          <Box>
            {isSmallScreens ? (
              <>
                {/* Hamburger Menu Icon */}
                <IconButton
                  onClick={() => toggleDrawer(true)}
                  sx={{ color: "white", marginTop: "70px" }}
                  className="Hamburger-btn"
                >
                  <FaBars />
                </IconButton>

                {/* Drawer for Links */}
                <Drawer
                  anchor="right"
                  open={drawerOpen}
                  onClose={() => toggleDrawer(false)}
                >
                  <List sx={{ width: 250 }}>
                    {[
                      { to: "/", label: "Home" },
                      { to: "/about", label: "About" },
                      { to: "/signup", label: "Register/Login" },
                    ].map((item, index) => (
                      <ListItem
                        key={index}
                        button
                        onClick={() => toggleDrawer(false)}
                        sx={drawerItemStyles}
                      >
                        <ListItemText>
                          <Link
                            to={item.to}
                            style={{
                              ...linkStyles,
                              ...(location.pathname === item.to
                                ? activeLinkStyles
                                : {}),
                            }}
                          >
                            {item.label}
                          </Link>
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Drawer>
              </>
            ) : (
              /* Display links in a row for larger screens */
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  flexDirection: "row",
                }}
              >
                <Link
                  to="/"
                  style={{
                    ...linkStyles,
                    ...(location.pathname === "/" ? activeLinkStyles : {}),
                  }}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  style={{
                    ...linkStyles,
                    ...(location.pathname === "/about" ? activeLinkStyles : {}),
                  }}
                >
                  About
                </Link>
                <Link
                  to="/signup"
                  style={{
                    ...linkStyles,
                    ...(location.pathname === "/signup"
                      ? activeLinkStyles
                      : {}),
                  }}
                >
                  Register/Login
                </Link>
              </Box>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
