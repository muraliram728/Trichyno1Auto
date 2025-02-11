import React, { useState } from 'react';
import './Signup.css';
import { useSignup } from '../hooks/useSignup';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, error } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Combine fname and lname for displayName
      const displayName = `${fname} ${lname}`;

      // Pass the displayName and other details to signup
      await signup({ fname, lname, email, password, displayName, isAdmin: true });

      // Redirect after successful signup
      navigate('/'); 
    } catch (err) {
      console.log("Signup failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login">Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your first name"
          value={fname}
          onChange={(e) => setfname(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter your last name"
          value={lname}
          onChange={(e) => setlname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          required
        />
        <div className="button-container">
          <button type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Signup'}
          </button>
          <button type="button" className="login-btn" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Signup;
