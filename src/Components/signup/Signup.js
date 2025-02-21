import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, Container, Paper, Alert } from '@mui/material';
import { useSignup } from '../hooks/useSignup';
import { useNavigate } from 'react-router-dom';
import './Signup.css'

const Signup = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    license: '',
    email: '',
    code: '',
    password: '',
    mobileNo: '',
    altMobileNo: '',
    aadhaarCardNo: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { signup, error } = useSignup();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate('/'); 
    }, 2000);
    try {
      await signup({ ...formData, displayName: `${formData.fname} ${formData.lname}`, isAdmin: true });
      setShowAlert(true);
    } catch (err) {
      console.log('Signup failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 5, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Signup
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            {[
              { name: 'fname', label: 'First Name' },
              { name: 'lname', label: 'Last Name' },
              { name: 'license', label: 'License No' },
              { name: 'email', label: 'Email', type: 'email' },
              { name: 'code', label: 'Code' },
              { name: 'password', label: 'Password', type: 'password' },
              { name: 'mobileNo', label: 'Mobile No' },
              { name: 'altMobileNo', label: 'Alternative Mobile No' },
              { name: 'aadhaarCardNo', label: 'Aadhaar No', pattern: '\\d{12}' },
              { name: 'address', label: 'Address' },
            ].map((field, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label={field.label}
                  name={field.name}
                  type={field.type || 'text'}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, }}>
            <Button type="submit" variant="contained" color="primary"  disabled={loading} sx={{background:'#f6ce4a'}}>
              {loading ? 'Signing up...' : 'Signup'}
            </Button>
          </Box>
            <p className="already-account">
            Already have an account?
            <span onClick={() => navigate('/login')} className="signin-link"> Sign in</span>
          </p>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </Box>
      </Paper>
      {showAlert && (
        <Alert severity="success" sx={{ mt: 3 }}>
          Signup successful! Redirecting to login...
        </Alert>
      )}
    </Container>
  );
};

export default Signup;
