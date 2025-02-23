// import React, { useState, useEffect } from "react";
// import "./headerstyles.css";
// import { FaBars } from "react-icons/fa";
// import bannerimage from "../../assets/images/Headerimg.png";
// import { NavLink } from "react-router-dom";
// import Logout from "./Logout";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth, db } from "../../firebase/config";
// import Logo from "../../assets/images/TRYNO1AUTO LOGO.png";

// const Header = () => {
//   const [isopen, setIsopen] = useState(false);
//   const [user] = useAuthState(auth);

//   const toggleMenu = () => {
//     setIsopen(!isopen);
//   };

//   const closeMenu = () => {
//     setIsopen(false);
//   };

//   return (
//     <header>
//       <div className="banner-container">
//         <div>
//           <img src={Logo} alt="Logo" className="logo" />
//         </div>
//         <div className="banner-text">
//           <h1>
//             <span className="highlight-word">Trichy</span> No.1 Auto
//           </h1>
//           <h5 className="para">Drivers Welfare Association</h5>
//           <p className="forum">திருச்சி No.1 ஆட்டோ ஓட்டுனர் நலச்சங்கம்</p>
//           <p>"விரைவான சேவை. பாதுகாப்பான பயணம்."</p>
//         </div>
//         <div>
//           <img src={bannerimage} alt="Banner" className="banner-img" />
//         </div>
//       </div>

//       <div className="Container">
//         <nav>
//           <ul className={isopen ? "nav-link active" : "nav-link"}>
//             <li>
//               <NavLink
//                 to="/"
//                 className={({ isActive }) => (isActive ? "active" : "")}
//                 onClick={closeMenu}
//               >
//                 Home
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/about"
//                 className={({ isActive }) => (isActive ? "active" : "")}
//                 onClick={closeMenu}
//               >
//                 About
//               </NavLink>
//             </li>

//             {/* Show Register/Login only if user is NOT logged in */}
//             {!user && (
//               <li>
//                 <NavLink
//                   to="/Signup"
//                   className={({ isActive }) => (isActive ? "active" : "")}
//                   onClick={closeMenu}
//                 >
//                   Register/Login
//                 </NavLink>
//               </li>
//             )}

//             {/* Show Logout only if user IS logged in */}
//             {user && (
//               <li className="logout-container">
//                 <Logout />
//               </li>
//             )}
//           </ul>
//         </nav>
//         <div className="icon" onClick={toggleMenu}>
//           <FaBars />
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { AppBar, Toolbar, Box, Typography, useMediaQuery, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import bannerimage from "../../assets/images/Headerimg.png";
import Logo from "../../assets/images/TRYNO1AUTO LOGO.png";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const isSmallScreen = useMediaQuery("(max-width:400px)");
  const isSmallScreens = useMediaQuery("(max-width:768px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  }
  return (
    <AppBar position="static" sx={{ backgroundColor: "#FFD700", padding: "1rem 0" }}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "column" }, // Default to column
          alignItems: "center",
        }}
      >
        {/* First Row: Logo, Title, Banner Image */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row", // Always a row layout
            alignItems: "center",
            justifyContent: "space-between", // Space between for horizontal layout
            width: "100%", // Full width of the row
            px: 2, // Add some horizontal padding
          }}
        >
          {/* Logo Section */}
          <Box>
            <img src={Logo} alt="Logo" style={{ width: 100, height: 100, borderRadius: "50%" }} />
          </Box>

          {/* Title Section */}
          <Box
            sx={{
              textAlign: "center",
              flexGrow: 1, // Allow title to take up available space
            }}
          >
            <Typography
              variant={isSmallScreen ? "h6" : "h4"}
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              <span style={{ color: "#333333" }}>Trichy</span>{" "}
              <span>No.1 Auto</span>
            </Typography>
          </Box>

          {/* Banner Image Section */}
          <Box>
            <img
              src={bannerimage}
              alt="Auto Picture"
              style={{ width: 150, height: 150 }}
            />
          </Box>
        </Box>


        {/* Second Row: Remaining Content */}
        <Box sx={{
          display: "flex",
          justifyContent:"space-between",
          width: { xs: "100%", sm: "100%", md: "auto" },
          flexDirection: { xs: "row", sm: "row", md: "column" },
        }}>
          {/* Text Content */}
          <Box>
            <Typography
              variant="h6"
              component="div"
              sx={{
                marginBottom: 1,
                color: "#212020",
                fontSize: { xs: "15px", sm: "inherit" }, // 15px for 500px and below
              }}
            >
              Drivers Welfare Association
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{
                marginBottom: 2,
                fontFamily: "'Merriweather', serif",
                color: "#444",
                fontSize: { xs: "15px", sm: "inherit" }, // 15px for 500px and below
              }}
            >
              திருச்சி No.1 ஆட்டோ ஓட்டுனர் நலச்சங்கம்
              <br />
              <span style={{ color: "black" }}>
                "விரைவான சேவை. பாதுகாப்பான பயணம்"
              </span>
            </Typography>
          </Box>
          <Box>
            {isSmallScreens ? (
              <>
                {/* Hamburger Menu Icon */}
                <IconButton
                  onClick={() => toggleDrawer(true)}
                  sx={{ color: "blue", fontSize: "1.5rem" }}
                >
                  <FaBars />
                </IconButton>

                {/* Drawer for Links */}
                <Drawer
                  anchor="right"
                  open={drawerOpen}
                  onClose={() => toggleDrawer(false)}
                >
                  <List
                    sx={{
                      width: 250,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ListItem button onClick={() => toggleDrawer(false)}>
                      <ListItemText>
                        <a href="/" style={{ textDecoration: "none", color: "black" }}>
                          Home
                        </a>
                      </ListItemText>
                    </ListItem>
                    <ListItem button onClick={() => toggleDrawer(false)}>
                      <ListItemText>
                        <a
                          href="/about"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          About
                        </a>
                      </ListItemText>
                    </ListItem>
                    <ListItem button onClick={() => toggleDrawer(false)}>
                      <ListItemText>
                          <a
                            href="/Signup"
                            style={{ textDecoration: "none", color: "black", }}
                          >
                          Register/Login
                        </a>
                      </ListItemText>
                    </ListItem>
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
                <a href="/" style={{ textDecoration: "none", color: "blue" }}>
                  Home
                </a>
                <a href="/about" style={{ textDecoration: "none", color: "blue" }}>
                  About
                </a>
                <a href="/Signup" style={{ textDecoration: "none", color: "blue" }}>
                  Register/Login
                </a>
              </Box>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
