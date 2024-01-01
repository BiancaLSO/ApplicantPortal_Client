import React, { useState } from "react";
import "../css/category-chips.css";

const CategoryChips = ({ categories }) => {
  const [selectedChip, setSelectedChip] = useState([]);

  const toggleChip = (category) => {
    const isSelected = selectedChip.includes(category);
    setSelectedChip((prevSelectedChip) => {
      if (isSelected) {
        return prevSelectedChip.filter((chip) => chip !== category);
      } else {
        return [...prevSelectedChip, category];
      }
    });
  };

  return (
    <div className="category-chips">
      <span className="category">Categories:</span>
      {categories.map((category) => (
        <span
          key={category}
          className={`chip ${
            selectedChip.includes(category) ? "selected" : ""
          }`}
          onClick={() => toggleChip(category)}
        >
          {category}
        </span>
      ))}
    </div>
  );
};

export default CategoryChips;
