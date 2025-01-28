import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Show confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to log out?');

    if (isConfirmed) {
      signOut(auth)
        .then(() => {
          console.log('User logged out');
          navigate('/login'); // Redirect to login page after logout
        })
        .catch((error) => {
          console.error('Error signing out: ', error);
        });
    } else {
      console.log('Logout canceled');
    }
  };

  return (
    <button onClick={handleLogout} style={{ color: 'white' }}>
      Logout
    </button>
  );
};

export default Logout;
