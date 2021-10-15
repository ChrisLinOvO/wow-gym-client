import React from "react";
import FilterButton from "../filter-button/FilterButton";

import "./FilterBar.scss";
// filterCollection, filterPrice, filterType, title
// filterType={filterType}
//           filterPrice={filterPrice}
//           filterCollection={filterCollection}
const FilterBar = ({ title, ...props }) => {
  return (
    <div className="filter-bar">
      <div className="filter-bar-itemtype">
        <span>{title} : </span>
        <FilterButton {...props} />
      </div>
    </div>
  );
};

export default FilterBar;
