import * as React from "react";
import FilterDropdown from "./FilterDropdown";

interface IPros {}

const FilterSelector: React.FC<IPros> = () => {
  return (
    <div className="ac-datagrid--option_bar__filter_selector">
      <ul className="filter_selector__list">
        <li className="filter_selector__item">
          <label>Column</label>
          <FilterDropdown />
        </li>
        <li className="filter_selector__item">
          <label>Value</label>
          <input type="text" />
        </li>
        <li className="filter_selector__item">
          <label>Operators</label>
          <FilterDropdown />
        </li>
      </ul>
    </div>
  );
};

export default React.memo(FilterSelector);
