import React, { useState } from 'react';
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import sign-in method
import { auth } from '../../firebase/config'; // Import Firebase auth
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirect

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to manage errors
  const navigate = useNavigate(); // Hook to redirect after successful login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before new attempt

    try {
      // Attempt to sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('User signed in:', user.uid);
      alert('Login successful!');

      // Redirect to the home page after successful login
      navigate('/'); // Change this path to your desired destination

      // Clear the input fields
      setEmail('');
      setPassword('');
    } catch (err) {
      // Check the error code
      if (err.code === 'auth/user-not-found') {
        alert('User not found. Please sign up first.');
      } else if (err.code === 'auth/wrong-password') {
        alert('Incorrect password. Please try again.');
      } else {
        console.error(err.message);
        setError('Failed to log in. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
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
        <button type="submit">Sign In</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
