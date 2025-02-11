import React from 'react';
import './Services.css'; // Import the external CSS

const Services = () => {
  const phoneNumbers = ['+919080076738', '+917603994107', '+918903123944']; // Your numbers

  return (
    <div className="services-container">
      <h2 className="services-title">Contact Our Services</h2>
      <ul className="services-list">
        {phoneNumbers.map((number, index) => (
          <li key={index}>
            <a href={`tel:${number}`} className="phone-button">{number}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;
