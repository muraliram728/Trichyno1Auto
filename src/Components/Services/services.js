import React from 'react';

const Services = () => {
  const phoneNumbers = ['+918056499365', '+918765432109', '+917654321098']; // Add your numbers

  return (
    <div>
      <h2>Contact Our Services</h2>
      <ul>
        {phoneNumbers.map((number, index) => (
          <li key={index}>
            <a href={`tel:${number}`} style={{ textDecoration: 'none', color: 'blue', fontSize: '18px' }}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;
