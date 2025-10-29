import React from "react";

const Sidebar = ({ filters, setFilters }) => {
  const ranges = [
    { label: "0–50", min: 0, max: 50 },
    { label: "51–100", min: 51, max: 100 },
    { label: "101–150", min: 101, max: 150 },
    { label: "151+", min: 151, max: 1000 },
  ];

  const handleRadioChange = (stat, range) => {
    setFilters((prev) => ({
      ...prev,
      [stat]: { min: range.min, max: range.max },
    }));
  };

  const renderStatFilter = (stat) => (
    <div className="filter-group">
      <h3>{stat.toUpperCase()}</h3>

      {/* Clear option */}
      <label>
        <input
          type="radio"
          name={stat}
          checked={filters[stat].min === 0 && filters[stat].max === 1000}
          onChange={() => handleRadioChange(stat, { min: 0, max: 1000 })}
        />
        All
      </label>

      {ranges.map((range) => (
        <label key={range.label}>
          <input
            type="radio"
            name={stat}
            checked={
              filters[stat].min === range.min && filters[stat].max === range.max
            }
            onChange={() => handleRadioChange(stat, range)}
          />
          {range.label}
        </label>
      ))}
    </div>
  );

  return (
    <aside className="sidebar">
      <h2>Filters</h2>
      {renderStatFilter("hp")}
      {renderStatFilter("attack")}
      {renderStatFilter("defense")}
    </aside>
  );
};

export default Sidebar;
