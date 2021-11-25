import * as React from "react";
import { ThemeContextActionTypes } from "../../@interface";
import { useDatagridThemeContext } from "../../context/DatagridThemeContext";
import { themeProperties, themeLabel } from "./themeItems/ThemeProperties";

interface IPros {
  onMouseLeave: () => void;
}

const ColorCustom: React.FC<IPros> = (props) => {
  const { onMouseLeave } = props;
  const themeContext = useDatagridThemeContext();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const themeStyle = document.querySelector(`.${themeContext._theme}`) as HTMLParagraphElement;
    themeStyle.style.setProperty(e.target.name, e.target.value);
  }

  return (
    <div className="ac-datagrid--option_bar__custom_selector" onMouseLeave={onMouseLeave}>
      <ul className="color_selector__list">
        <li className="color_selector__item">
          {
            (themeProperties || []).map((prop, index) => (
              <div>
                <label>{themeLabel[index]}</label>
                <input type="color"
                  onChange={onChange}
                  name={prop}
                  key={index}
                />
              </div>
            ))
          }
        </li>
      </ul>
    </div>
  );
};

export default React.memo(ColorCustom);
