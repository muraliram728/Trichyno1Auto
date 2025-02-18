import React from 'react';
import Bgimg from '../../../assets/images/bgimage.jpg';
import overlayimg from '../../../assets/images/overlayimg.png';
import './subfooter.css'

const subfooter = () => {
  return (
    <div className="subfooter-container">
    <img className="bg-img" src={Bgimg} alt="Background" />
    
    {/* Content Wrapper */}
    <div className="content-wrapper">
      {/* Overlay Text */}
      <div className="overlay-text">
        <h1 className='overlay-title' >Some Text Here</h1>
        <p className='overlay-title1' >This is an example of text overlaying the background image.</p>
      </div>

      {/* Overlay Image */}
      <div className="overlay-image">
        <img src={overlayimg} alt="Another" />
      </div>
    </div>
  </div>
  )
}

export default subfooter