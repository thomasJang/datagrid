import { FilterContextActionTypes } from "../../@interface";
import * as React from "react";
import FilterDropdown from "./FilterDropdown";
import { useDatagridContext } from "../../context/DatagridContext";
import getDataItem from "../../lib/getDataItem";
import { useDatagridFilterDispatch } from "../../context/DatagridFilterContext";


interface IPros {}

const FilterSelector: React.FC<IPros> = () => {
  const context = useDatagridContext();
  const filterDispatch =  useDatagridFilterDispatch();

  const [col, setCol] = React.useState<string>("");
  const [value, setValue] = React.useState<string>("");
  const [oper, setOper] = React.useState<string>("");

  const isIncaseSearch = (obj: any) => {
    for (const prop in obj) {
      if (prop.toLowerCase() === col.toLowerCase() && obj[prop] === value && oper === "equals")
          return true;
      else if(prop.toLowerCase() === col.toLowerCase() && obj[prop].includes(value) && oper === "contains")
          return true;
    }
    return false;
  }

  const dataFiltering = () => {
    const filteredData = [];
    for (let i = 0; i < context.dataLength; i++) {
        const item:any = getDataItem(context.data, i);
        const obj = item?.value;

        if(isIncaseSearch(obj))
          filteredData.push(item);
    }
    return filteredData;
  }

const onClickHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    filterDispatch({
        type: FilterContextActionTypes.SET_FILTER,
        isFiltered: false,
        filteredData: [],
        filteredDataLength: 0
    });
}

  const onKeyPressHandler:React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if(e.key == 'Enter') {
        const filteredData = dataFiltering();
        filterDispatch({
            type: FilterContextActionTypes.SET_FILTER,
            isFiltered: true,
            filteredData: filteredData,
            filteredDataLength: filteredData.length
        })
    }
  }

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  }

  const colDropDownClickHandler: React.MouseEventHandler<HTMLLIElement> = (e) => {
    e.preventDefault();
    setCol(e.currentTarget.id);
  }

  const operDropDownClickHandler: React.MouseEventHandler<HTMLLIElement> = (e) => {
    e.preventDefault();
    setOper(e.currentTarget.id);
  }

  return (
    <div className="ac-datagrid--option_bar__filter_selector">
     <ul className="filter_selector__list">
        <li className="filter_selector__item">
          <label>Column</label>
          <FilterDropdown 
            items= {(context._colGroup || []).map(col => col.label)}
            selectedItem ={col}
            selectCallBack = {colDropDownClickHandler}
          />
        </li>
        <li className="filter_selector__item">
          <label>Value</label>
          <input type="text" onChange = {onChangeHandler} onKeyPress ={onKeyPressHandler}/>
        </li>
        <li className="filter_selector__item">
          <label>Operators</label>
          <FilterDropdown 
            items= {["contains", "equals"]}
            selectedItem = {oper}
            selectCallBack = {operDropDownClickHandler}
          />
        </li>
      </ul>
    </div>
  );
};

export default React.memo(FilterSelector);
