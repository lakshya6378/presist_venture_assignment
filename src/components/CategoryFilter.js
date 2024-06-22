// src/components/CategoryFilter.js
import React from 'react';

const CategoryFilter = ({onFilter}) => {
  const categories=["Business","Sports","Science","Health","Entertainment","Technology"]
  return (
    <div className="category-filter">
      {categories.map(category => (
        <button key={category} onClick={() => onFilter(category)}>
          {category.charAt(0).toUpperCase()+category.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
