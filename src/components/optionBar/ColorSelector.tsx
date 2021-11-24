import * as React from "react";
import { ThemeContextActionTypes } from "../../@interface";
import { useDatagridThemeContext, useDatagridThemeDispatch } from "../../context/DatagridThemeContext";

import getDataItem from "../../lib/getDataItem";

interface IPros {}

const ColorSelector: React.FC<IPros> = () => {
  const context = useDatagridThemeContext();
  const colorDispatch = useDatagridThemeDispatch();

  const [color, setColor] = React.useState<string>("");

  const onClickHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    colorDispatch({
      type: ThemeContextActionTypes.SET_THEME,
      theme: color,
    });
  };

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setColor(e.target.value);
  };

  return (
    <div className="ac-datagrid--option_bar__color_selector">
      <ul className="color_selector__list">
        <li className="color_selector__item">
          <label>Select Color</label>
          {/* <ColorDropdown
          // items={(context._colGroup || []).map((col) => col.label)}
          // selectedItem={col}
          // selectCallBack={colDropDownClickHandler}
          /> */}
        </li>
      </ul>
    </div>
  );
};

export default React.memo(ColorSelector);
