const FilterBar = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="filter-container">
      <select 
        value={currentFilter} 
        onChange={(e) => onFilterChange(e.target.value)}
        className="filter-select"
      >
        <option value="all">All Tasks</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};

export default FilterBar;