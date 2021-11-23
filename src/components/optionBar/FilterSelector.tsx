import * as React from "react";
import FilterDropdown from "./FilterDropdown";

interface IPros {}

const FilterSelector: React.FC<IPros> = () => {
  return (
    <div className="ac-datagrid--option_bar__filter_selector">
      <ul>
        <li>
          <label>Column</label>
          <FilterDropdown />
        </li>
        <li>
          <label>Value</label>
          <input type="text" />
        </li>
        <li>
          <label>Operators</label>
          <FilterDropdown />
        </li>
      </ul>
      <button type="button">+</button>
    </div>
  );
};

export default React.memo(FilterSelector);
