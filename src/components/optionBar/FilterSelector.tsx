import * as React from "react";
import FilterDropdown from './FilterDropdown'
interface IPros {}

const FilterSelector: React.FC<IPros> = () => {
  return (
    <div className="ac-datagrid--option_bar__filter_selector">
      <FilterDropdown />
      <FilterDropdown />
    </div>
  );
};

export default React.memo(FilterSelector);
