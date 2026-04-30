import React from 'react';

function PinSkeleton() {
  // Мы создаем массив из разных высот, чтобы имитировать Masonry-сетку
  const heights = ['250px', '350px', '400px', '300px'];
  const randomHeight = heights[Math.floor(Math.random() * heights.length)];

  return (
    <div 
      className="skeleton-card" 
      style={{ 
        height: randomHeight, 
        width: '100%', 
        borderRadius: '16px', 
        marginBottom: '15px',
        backgroundColor: '#e0e0e0' // Базовый цвет, если CSS не подгрузится
      }}
    ></div>
  );
}

export default PinSkeleton;