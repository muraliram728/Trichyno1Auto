import React from 'react'
import './Herostyle.css'
import { useNavigate } from 'react-router-dom';
import lowcost from '../../assets/images/lowcost.jpg'
import safe from '../../assets/images/safe.webp'
import auto from '../../assets/images/auto.webp'
import service from '../../assets/images/service.png'
import customer from '../../assets/images/customer.jpg'
import admin from '../../assets/images/admin.jpg'


const Hero = () => {

  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/admin'); // Navigate to the admin page
  };

  const handleCostClick = () => {
    navigate('/cost'); // Navigate to the admin page
  };
  
  return (
    <div className="hero">
      <h2>Welcome</h2>
      <p>Trichy No.1 Auto</p>
      <div className="image-section">
        <div className="image-container" onClick={handleCostClick}>
          <img src={lowcost} alt="Low Cost" />
          <p>Low Cost</p>
        </div>
        <div className="image-container">
          <img src={safe} alt="Safe" />
          <p>Safe</p>
        </div>
        <div className="image-container">
          <img src={auto} alt="Auto" />
          <p>Auto</p>
        </div>
        <div className="image-container">
          <img src={service} alt="Service" />
          <p>Service</p>
        </div>
        <div className="image-container">
          <img src={customer} alt="Customer" />
          <p>Customer</p>
        </div>
        <div className="image-container" onClick={handleAdminClick}>
          <img src={admin} alt="Admin" />
          <p>Admin</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
