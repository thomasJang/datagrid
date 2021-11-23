import * as React from "react";

interface IPros {}

const FilterSelector: React.FC<IPros> = () => {
  return (
    <div className="ac-datagrid--option_bar__filter_selector">
      FilterSelector
    </div>
  );
};

export default React.memo(FilterSelector);
