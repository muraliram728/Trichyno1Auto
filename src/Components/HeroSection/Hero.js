import React from 'react';
import './Herostyle.css';
import { useNavigate } from 'react-router-dom';
import lowcost from '../../assets/images/lowcost.jpg';
import safe from '../../assets/images/safe.webp';
import auto from '../../assets/images/auto.webp';
import service from '../../assets/images/service.png';
import customer from '../../assets/images/customer.jpg';
import admin from '../../assets/images/admin.jpg';
import Advertisement from "./ImageSlider/ImageSlider";
import Review from './Review/Review';
import Subfooter from './subfooter/subfooter';

const Hero = () => {
  const navigate = useNavigate();
  const handleAdminClick = () => navigate('/admin');
  const handleCostClick = () => navigate('/cost');
  const handleTripTrackerClick = () => navigate('/TripTracker');
  const handleserviceClick = () => navigate('/service');
  const handlememberClick = () => navigate('/member');

  return (
    <div className="hero">
      <div>
        <Advertisement />
      </div>
      <div className="image-section">
        <div className="row">
          <div className="image-container" onClick={handleCostClick}>
            <img src={lowcost} alt="Low Cost" />
            <p>Low Cost</p>
          </div>
          <div className="image-container">
            <img src={safe} alt="Safe" />
            <p>Safe</p>
          </div>
          <div className="image-container">
            <img src={auto} alt="Auto" onClick={handleTripTrackerClick} />
            <p>TripTracker</p>
          </div>
        </div>
        <div className="row">
          <div className="image-container">
            <img src={service} alt="Service" onClick={handleserviceClick} />
            <p>Service</p>
          </div>
          <div className="image-container">
            <img src={customer} alt="Customer" onClick={handlememberClick} />
            <p>Members</p>
          </div>
          <div className="image-container" onClick={handleAdminClick}>
            <img src={admin} alt="Admin" />
            <p>Admin</p>
          </div>
        </div>
      </div>
      {/* <Review /> */}
      <Subfooter />
    </div>
  );
};

export default Hero;
