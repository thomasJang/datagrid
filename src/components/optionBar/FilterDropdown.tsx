import * as React from "react";
// import { IDatagridCommonProps } from "../../@interface";
// import { useDatagridFilterContext } from "../../context/DatagridFilterContext";
import triangleIcon from "../../assets/icons/icon-triangle.svg";

interface IProps {
  items: any[],
  selectedItem: any
  selectCallBack: any,
}

const FilterDropdown: React.FC<IProps> = ({items, selectedItem, selectCallBack}) => {
  // const context = useDatagridFilterContext();
  // const handleColumnSelect: React.ChangeEventHandler<HTMLSelectElement> = (ev) => {
  //     console.log(ev.target.value);
  // };
  const dropdownRef = React.useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  return (
    //   <div className="dropdown-container">
    <div className="menu-container">
      <div className="content-box">
        <button onClick={onClick} className="menu-trigger">
        {selectedItem}
          </button>
        <img src={triangleIcon} alt="icon" />
      </div>
      <nav
        ref={dropdownRef}
        className={`menu ${isActive ? "active" : "inactive"}`}
      >
        <ul>
          {(items || []).map(
            (item,i) => (
            <li id={item} key = {i} onClick = {selectCallBack}>
              {item}
            </li>)
          )}
        </ul>
      </nav>
    </div>
    //   </div>
  );
};
export default FilterDropdown;

export const useDetectOutsideClick = (el: any, initialState: any) => {
  const [isActive, setIsActive] = React.useState(initialState);

  React.useEffect(() => {
    const onClick = (e: any) => {
      // If the active element exists and is clicked outside of
      if (el.current !== null && !el.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };
    if (isActive) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isActive, el]);

  return [isActive, setIsActive];
};
