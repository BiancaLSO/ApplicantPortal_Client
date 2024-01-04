import React, { useState, useEffect } from "react";
import "../css/category-chips.css";

const CategoryChips = ({ categories }) => {
  const [selectedChip, setSelectedChip] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log("Categories in CategoryChips:", categories);

  useEffect(() => {
    setIsLoading(true);
    if (categories && categories.length > 0) {
      setIsLoading(false);
    }
  }, [categories]);

  return (
    <div className="category-chips">
      <span className="category">Categories:</span>
      {isLoading ? (
        <p>Loading categories...</p>
      ) : categories && categories.length > 0 ? (
        categories.map((category) => (
          <span
            key={category.id}
            className={`chip ${
              selectedChip.includes(category) ? "selected" : ""
            }`}
            onClick={() =>
              setSelectedChip((prevSelectedChip) => {
                const isSelected = prevSelectedChip.includes(category);
                return isSelected
                  ? prevSelectedChip.filter((chip) => chip !== category)
                  : [...prevSelectedChip, category];
              })
            }
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
