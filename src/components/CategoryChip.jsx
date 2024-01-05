import React, { useState, useEffect } from "react";
import "../css/category-chips.css";

const CategoryChips = ({ categories, onCategorySelect }) => {
  const [selectedChips, setSelectedChips] = useState([]);

  const handleChipClick = (category) => {
    setSelectedChips((prevSelectedChips) => {
      const isSelected = prevSelectedChips.includes(category);
      return isSelected
        ? prevSelectedChips.filter((chip) => chip !== category)
        : [...prevSelectedChips, category];
    });

    onCategorySelect(selectedChips);
  };

  useEffect(() => {
    onCategorySelect(selectedChips);
  }, [selectedChips, onCategorySelect]);

  return (
    <div className="category-chips">
      <span className="category">Categories:</span>
      {categories && categories.length > 0 ? (
        categories.map((category) => (
          <span
            key={category.id}
            className={`chip ${
              selectedChips.includes(category) ? "selected" : ""
            }`}
            onClick={() => handleChipClick(category)}
          >
            {category.name}
          </span>
        ))
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  );
};

export default CategoryChips;
