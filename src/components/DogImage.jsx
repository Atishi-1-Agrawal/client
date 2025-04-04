import React from 'react';

const DogImage = ({ code, description, imageUrl }) => (
  <div>
    <h3>{code} - {description}</h3>
    <img src={imageUrl} alt={`HTTP ${code}`} />
  </div>
);

export default DogImage;