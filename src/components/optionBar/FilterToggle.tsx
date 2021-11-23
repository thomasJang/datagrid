import * as React from "react";
import FilterIcon from "../../assets/icons/icon-filter.svg";

interface IPros {
  onClick: () => void;
}

const FilterToggle: React.FC<IPros> = (props) => {
  const { onClick } = props;
  return (
    <div className="ac-datagrid--option_bar__filter_togle" onClick={onClick}>
      <img src={FilterIcon} />
      <span>FILTER</span>
    </div>
  );
};

export default React.memo(FilterToggle);
