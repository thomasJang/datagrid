import * as React from "react";
import { IDatagridCommonProps } from "../../@interface";
import { useDatagridFilterContext } from "../../context/DatagridFilterContext";
import "../../style/dropDown.less";

const DatagridFilter: React.FC<IDatagridCommonProps> = props => {
    const context = useDatagridFilterContext();
    const handleColumnSelect: React.ChangeEventHandler<HTMLSelectElement> = (ev) => {
        console.log(ev.target.value);
    };
    const dropdownRef = React.useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);
  
    return (
      <div className="container">
        <div className="menu-container">
          <button onClick={onClick} className="menu-trigger">
            <span>User</span>
            <img
              src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"
              alt="User avatar"
            />
          </button>
          <nav
            ref={dropdownRef}
            className={`menu ${isActive ? "active" : "inactive"}`}
          >
            <ul>
              <li>
                <a href="#">Messages</a>
              </li>
              <li>
                <a href="#">Trips</a>
              </li>
              <li>
                <a href="#">Saved</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }  
export default DatagridFilter;


/**
 * Hook for handling closing when clicking outside of an element
 * @param {React.node} el
 * @param {boolean} initialState
 */
 export const useDetectOutsideClick = (el : any, initialState : any) => {
    const [isActive, setIsActive] = React.useState(initialState);
  
    React.useEffect(() => {
      const onClick = (e : any) => {
        // If the active element exists and is clicked outside of
        if (el.current !== null && !el.current.contains(e.target)) {
          setIsActive(!isActive);
        }
      };
  
      // If the item is active (ie open) then listen for clicks outside
      if (isActive) {
        window.addEventListener("click", onClick);
      }
  
      return () => {
        window.removeEventListener("click", onClick);
      };
    }, [isActive, el]);
  
    return [isActive, setIsActive];
  };
  