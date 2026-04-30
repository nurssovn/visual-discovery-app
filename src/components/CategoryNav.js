import React from 'react';
    
const categories = ['all', 'saved', 'car', 'art', 'outfit', 'wall', 'aesthetic', 'home', 'food'];

function CategoryNav({ activeCategory, onCategoryChange }) {
  return (
    <div className="category-nav">
      {categories.map((category) => (
        <button
          key={category}
          className={activeCategory === category ? 'active' : ''}
          onClick={() => onCategoryChange(category)}
        >
           {category === 'saved' 
            ? '❖Saved' 
            : category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default CategoryNav;