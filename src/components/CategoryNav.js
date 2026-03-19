import React from 'react';

// Смотри, мы просто добавили 'saved' вот сюда, вторым словом:
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
          {/* Если это кнопка saved, рисуем сердечко. Если другая - просто делаем первую букву большой */}
          {category === 'saved' 
            ? '❖Saved' 
            : category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default CategoryNav;