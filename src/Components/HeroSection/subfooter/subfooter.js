import React from 'react';
import Bgimg from '../../../assets/images/bgimage1.jpeg';
import overlayimg from '../../../assets/images/overlayimg.png';
import './subfooter.css';
import { motion } from "framer-motion";


const subfooter = () => {
  return (
    <div className="subfooter-container">
      <img className="bg-img" src={Bgimg} alt="Background" />

      {/* Content Wrapper */}
      <div className="content-wrapper">
        <motion.div
          className="overlay-text"
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >

          <h1 className='overlay-title' >Trusted by Thousands</h1>
          <p className='overlay-title1' >Safe, reliable, and affordable transportation in your city.</p>
        </motion.div>

        {/* Overlay Image */}
        <motion.div
          className="overlay-image"
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >

          <img src={overlayimg} alt="Another" />
        </motion.div>
      </div>
    </div>
  )
}

export default subfooter