import React from 'react';

function PinSkeleton() {
  const heights = ['250px', '350px', '400px', '300px'];
  const randomHeight = heights[Math.floor(Math.random() * heights.length)];

  return (
    <div
      className="skeleton-card"
      style={{
        height: randomHeight,
        width: '100%',
        marginBottom: '15px',
      }}
    />
  );
}

export default PinSkeleton;
