import * as React from "react";

interface IPros {
  onClick: () => void;
}

const FilterToggle: React.FC<IPros> = (props) => {
  const { onClick } = props;
  return (
    <button className="ac-datagrid--option_bar__filter_togle" onClick={onClick}>
      FILTER
    </button>
  );
};

export default React.memo(FilterToggle);
