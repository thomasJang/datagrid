import * as React from "react";
// import { IDatagridCommonProps } from "../../@interface";
// import { useDatagridFilterContext } from "../../context/DatagridFilterContext";
import "../../style/dropDown.less";
import triangleIcon from '../../assets/Icons/icon-triangle.svg'
const DatagridFilter: React.FC<IDatagridCommonProps> = props => {
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
            <button onClick={onClick} className="menu-trigger" />
            <img src={triangleIcon} alt="icon" />
         </div>
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
    //   </div>
    );
  }  
export default DatagridFilter;


 export const useDetectOutsideClick = (el : any, initialState : any) => {
    const [isActive, setIsActive] = React.useState(initialState);
  
    React.useEffect(() => {
      const onClick = (e : any) => {
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
  