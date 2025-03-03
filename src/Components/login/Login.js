import React, { useState } from "react";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/TRYNO1AUTO LOGO.jpeg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("User signed in:", user.uid);
      alert("Login successful!");
      navigate("/");

      setEmail("");
      setPassword("");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        alert("User not found. Please sign up first.");
      } else if (err.code === "auth/wrong-password") {
        alert("Incorrect password. Please try again.");
      } else {
        console.error(err.message);
        setError("Failed to log in. Please try again.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-form">
          <h2 className="login">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="signin">
              Log In
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
        <div className="auth-image">
          <img src={Logo} alt="Login Visual" />
        </div>
      </div>
    </div>
  );
};

export default Login;
