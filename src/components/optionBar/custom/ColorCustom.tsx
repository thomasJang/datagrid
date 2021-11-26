import * as React from "react";
import { ThemeContextActionTypes } from "../../../@interface";
import { useDatagridThemeContext } from "../../../context/DatagridThemeContext";
import { themeProperties, themeLabel } from "../themeItems/ThemeProperties";

interface IPros {
  onClick: () => void;
}

const ColorCustom: React.FC<IPros> = (props) => {
  const { onClick } = props;
  const themeContext = useDatagridThemeContext();
  const themeStyle = document.querySelector(
    `.${themeContext._theme}`
  ) as HTMLParagraphElement;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    themeStyle.style.setProperty(e.target.name, e.target.value);
  };

  return (
    <div className="ac-datagrid--option_bar__custom_selector">
      <ul className="color_selector__list">
        {(themeProperties || []).map((prop, index) => (
          <li className="color_selector__item" key={index}>
            <label>{themeLabel[index]}</label>
            <input type="color" onChange={onChange} name={prop} key={index} />
          </li>
        ))}
        <li className="color_selector__item">
          <button className="color_selector__btn" onClick={onClick}>
            Done
          </button>
        </li>
      </ul>
    </div>
  );
};

export default React.memo(ColorCustom);
