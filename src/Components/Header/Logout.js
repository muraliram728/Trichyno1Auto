import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { Link } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Show confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to log out?");

    if (isConfirmed) {
      signOut(auth)
        .then(() => {
          console.log("User logged out");
          navigate("/login"); // Redirect to login page after logout
        })
        .catch((error) => {
          console.error("Error signing out: ", error);
        });
    } else {
      console.log("Logout canceled");
    }
  };

  const linkStyles = {
    textDecoration: "none",
    color: "black",
    fontWeight: "bold",
    padding: "8px 16px",
    display: "block",
    cursor: "pointer", // Makes it behave like a link
    background: "none",
    border: "none",
    outline: "none",
  };

  return (
    <Link onClick={handleLogout} style={linkStyles}>
      Logout
    </Link>
  );
};

export default Logout;
