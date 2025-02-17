import React, { useState } from 'react';
import './Signup.css';
import { useSignup } from '../hooks/useSignup';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [email, setemail] = useState('');
  const [code, setCode] = useState('');
  const [password, setpassword] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [altMobileNo, setAltMobileNo] = useState('');
  const [adharNo, setAdharNo] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { signup, error } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const aadhaarCardNo = adharNo === "" ? null : adharNo;
    try {
      const displayName = `${fname} ${lname}`;
      await signup({
        fname, lname, email, password, displayName, isAdmin: true, code, mobileNo, altMobileNo, aadhaarCardNo, address
      });
      setShowAlert(true);
    } catch (err) {
      console.log("Signup failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-form-container">
          <h2 className="signup-title">Signup</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-row">
              <div className="form-column">
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
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Enter your code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-column">
                <input
                  type="text"
                  placeholder="Mobile No"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Alternative Mobile No"
                  value={altMobileNo}
                  onChange={(e) => setAltMobileNo(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Adhar No"
                  value={adharNo}
                  onChange={(e) => setAdharNo(e.target.value)}
                  pattern="\d{12}"

                  required
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="button-container">
              <button type="submit" disabled={loading}>
                {loading ? 'Signing up...' : 'Signup'}
              </button>
            </div>
          </form>

          {error && <p className="error">{error}</p>}

          <p className="already-account">
            Already have an account?
            <span onClick={() => navigate('/login')} className="signin-link"> Sign in</span>
          </p>
        </div>
      </div>

      {/* Custom Alert Box */}
      {showAlert && (
        <div className="custom-alert">
          <div className="alert-content">
            <p>Signup successful! Redirecting to login...</p>
            <button onClick={() => navigate('/')}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
