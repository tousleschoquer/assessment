import React, { useState } from 'react';
import styled from 'styled-components';

// Container for the filter section.
const FilterContainer = styled.div`
  margin-bottom: 16px; // Adds space below the filter section
`;

// ButtonGroup wraps the filter buttons for layout purposes.
const ButtonGroup = styled.div`
  margin-bottom: 1px; // Adds minimal space between button group and dropdown
`;

// Styled button for the filter options (Show/Hide Filters and Reset Filters).
// Includes neon-violet outline and hover effect for a glowing appearance.
const FilterButton = styled.button`
  background-color: #6A0DAD; /* Violet */
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 8px; // Adds space between buttons
  transition: background-color 0.3s, box-shadow 0.3s;

  /* Neon-violet outline */
  box-shadow: 0 0 15px rgba(138, 43, 226, 0.8), 0 0 30px rgba(138, 43, 226, 0.5);

  &:hover {
    background-color: #312e34; /* Darker violet */
    /* Intensify the neon glow on hover */
    box-shadow: 0 0 20px rgba(138, 43, 226, 1), 0 0 40px rgba(138, 43, 226, 0.7);
  }
`;

// Dropdown menu that appears when the user clicks "Show Filters".
// Displays the category filters in a flexible row format with wrapping.
const DropdownMenu = styled.div`
  background-color: #6A0DAD; /* Light background for dropdown */
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap; /* Allows the categories to be displayed in a line */
  gap: 10px; /* Adds space between the categories */
`;

// Styled component for the checkbox within each category filter.
// Aligns the checkbox and label horizontally and styles the checkbox itself.
const CategoryCheckbox = styled.div`
  display: flex;
  align-items: center; // Aligns checkbox and label vertically

  input[type='checkbox'] {
    accent-color: #9370DB; /* Color of the checkbox when selected */
    margin-right: 8px; // Adds space between the checkbox and label
    width: 20px;
    height: 20px;
  }

  label {
    cursor: pointer; // Adds pointer cursor to the label
  }
`;

// Interface for the CategoryFilter component's props.
// Receives categories (all available categories), selectedCategories (checked categories), 
// onCategoryChange (function to handle checkbox changes), and onResetFilters (resets selected filters)
interface CategoryFilterProps {
  categories: string[]; // List of category names
  selectedCategories: string[]; // Currently selected categories
  onCategoryChange: (category: string) => void; // Function called when a checkbox is checked/unchecked
  onResetFilters: () => void; // Function to reset all filters
}

// CategoryFilter component
// This component provides UI controls for filtering by categories and managing selected filters.
const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
  onResetFilters,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Manages the dropdown state (open/closed)

  // Function to toggle the dropdown menu open and closed
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <FilterContainer>
      <ButtonGroup>
        {/* Button to show/hide the filter dropdown */}
        <FilterButton onClick={toggleDropdown}>
          {isDropdownOpen ? 'Hide Filters' : 'Show Filters'}
        </FilterButton>
        {/* Button to reset all selected filters */}
        <FilterButton onClick={onResetFilters}>Reset Filters</FilterButton>
      </ButtonGroup>

      {/* Display the dropdown menu with category checkboxes if the dropdown is open */}
      {isDropdownOpen && (
        <DropdownMenu>
          {categories.map((category) => (
            <CategoryCheckbox key={category}>
              {/* Checkbox for each category */}
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)} // Checks the box if the category is selected
                onChange={() => onCategoryChange(category)} // Triggers the onCategoryChange function on click
                id={category}
              />
              {/* Label for the checkbox */}
              <label htmlFor={category}>{category}</label>
            </CategoryCheckbox>
          ))}
        </DropdownMenu>
      )}
    </FilterContainer>
  );
};

export default CategoryFilter;
