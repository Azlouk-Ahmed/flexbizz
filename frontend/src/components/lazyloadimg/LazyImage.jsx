import React, { useState, useEffect } from 'react';

const LazyImage = ({ src, alt, className }) => {
  const [error, setError] = useState(false); 

  const onError = () => {
    setError(true); 
  };

  useEffect(() => {
    // Reset error state when src prop changes
    setError(false);
  }, [src]);

  return (
    <img
      src={error ? '/img/brokenimg.png' : src}
      alt={alt}
      onError={onError}
      className={className}
    />
  );
};

export default LazyImage;
